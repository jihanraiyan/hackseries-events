import { useRef, useEffect, useCallback, useState } from 'react';
import ForceGraph2D, { ForceGraphMethods, NodeObject } from 'react-force-graph-2d';
import { CommunicationProfile, ChemistryAnalysis } from '@/types/event';
import { motion, AnimatePresence } from 'framer-motion';

interface ChemistryGraphProps {
  guests: CommunicationProfile[];
  analysis: ChemistryAnalysis;
  width?: number;
  height?: number;
}

interface GraphNode extends NodeObject {
  id: string;
  name: string;
  avatar: string;
  chemistry: number;
  img?: HTMLImageElement;
}

interface GraphLink {
  source: string;
  target: string;
  strength: number;
}

export default function ChemistryGraph({ guests, analysis, width = 500, height = 400 }: ChemistryGraphProps) {
  const fgRef = useRef<ForceGraphMethods>();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({ nodes: [], links: [] });

  useEffect(() => {
    const nodes: GraphNode[] = guests.map(guest => ({
      id: guest.userId,
      name: guest.name,
      avatar: guest.avatar,
      chemistry: guest.connectionDegree === 1 ? 90 : guest.connectionDegree === 2 ? 75 : 60
    }));

    const links: GraphLink[] = [];
    guests.forEach((guest1, i) => {
      guests.forEach((guest2, j) => {
        if (i < j) {
          const key = `${guest1.userId}_${guest2.userId}`;
          const score = analysis.pairwiseScores[key] || 75;
          links.push({
            source: guest1.userId,
            target: guest2.userId,
            strength: score
          });
        }
      });
    });

    // Preload images
    nodes.forEach(node => {
      const img = new Image();
      img.src = node.avatar;
      img.onload = () => {
        node.img = img;
        setGraphData(prev => ({ ...prev })); // Trigger re-render
      };
    });

    setGraphData({ nodes, links });
  }, [guests, analysis]);

  const nodeCanvasObject = useCallback((node: NodeObject, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const graphNode = node as GraphNode;
    const size = 12;
    const isHovered = hoveredNode === graphNode.id;
    const scale = isHovered ? 1.3 : 1;
    const x = node.x ?? 0;
    const y = node.y ?? 0;

    // Draw glow for high chemistry
    if (graphNode.chemistry > 70) {
      ctx.beginPath();
      ctx.arc(x, y, size * scale + 8, 0, 2 * Math.PI);
      const gradient = ctx.createRadialGradient(x, y, size * scale, x, y, size * scale + 15);
      gradient.addColorStop(0, 'rgba(0, 180, 130, 0.5)');
      gradient.addColorStop(1, 'rgba(0, 180, 130, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Draw border
    ctx.beginPath();
    ctx.arc(x, y, size * scale + 2, 0, 2 * Math.PI);
    ctx.fillStyle = graphNode.chemistry > 70 ? '#00D9A0' : graphNode.chemistry > 50 ? '#FFB84D' : '#FF4D4D';
    ctx.fill();

    // Draw image or placeholder
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, size * scale, 0, 2 * Math.PI);
    ctx.clip();
    
    if (graphNode.img && graphNode.img.complete) {
      ctx.drawImage(graphNode.img, x - size * scale, y - size * scale, size * 2 * scale, size * 2 * scale);
    } else {
      ctx.fillStyle = '#e5e5e5';
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.font = `${14 * scale}px Space Grotesk`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(graphNode.name.charAt(0), x, y);
    }
    ctx.restore();

    // Draw name label
    if (globalScale > 0.7 || isHovered) {
      ctx.font = `${isHovered ? 12 : 10}px Space Grotesk`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = isHovered ? '#000' : 'rgba(0,0,0,0.7)';
      ctx.fillText(graphNode.name.split(' ')[0], x, y + size * scale + 5);
    }
  }, [hoveredNode]);

  const linkColor = useCallback((link: GraphLink) => {
    const strength = link.strength;
    if (strength > 85) return 'rgba(0, 217, 160, 0.6)';
    if (strength > 70) return 'rgba(255, 184, 77, 0.5)';
    return 'rgba(255, 77, 77, 0.4)';
  }, []);

  const linkWidth = useCallback((link: GraphLink) => {
    return Math.max(1, (link.strength - 50) / 15);
  }, []);

  if (guests.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-visible bg-background/50">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        width={width}
        height={height}
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x ?? 0, node.y ?? 0, 18, 0, 2 * Math.PI);
          ctx.fill();
        }}
        linkColor={linkColor as any}
        linkWidth={linkWidth as any}
        linkCurvature={0.1}
        onNodeHover={(node) => setHoveredNode(node ? String(node.id) : null)}
        cooldownTicks={100}
        d3VelocityDecay={0.2}
        d3AlphaDecay={0.02}
        backgroundColor="transparent"
        enableZoomInteraction={true}
        enablePanInteraction={true}
      />
      
      <AnimatePresence>
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 glass rounded-lg px-3 py-2 text-sm"
          >
            {guests.find(g => g.userId === hoveredNode)?.name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
