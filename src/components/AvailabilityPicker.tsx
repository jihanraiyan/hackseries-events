import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvailabilityPickerProps {
  availability: Record<string, boolean[]>;
  onChange: (availability: Record<string, boolean[]>) => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TIME_SLOTS = [
  '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm'
];

export default function AvailabilityPicker({ availability, onChange }: AvailabilityPickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(true);

  const toggleSlot = (day: string, slotIndex: number, forceValue?: boolean) => {
    const newAvailability = { ...availability };
    if (!newAvailability[day]) {
      newAvailability[day] = new Array(TIME_SLOTS.length).fill(false);
    }
    newAvailability[day] = [...newAvailability[day]];
    newAvailability[day][slotIndex] = forceValue !== undefined ? forceValue : !newAvailability[day][slotIndex];
    onChange(newAvailability);
  };

  const handleMouseDown = (day: string, slotIndex: number) => {
    setIsDragging(true);
    const currentValue = availability[day]?.[slotIndex] || false;
    setDragValue(!currentValue);
    toggleSlot(day, slotIndex);
  };

  const handleMouseEnter = (day: string, slotIndex: number) => {
    if (isDragging) {
      toggleSlot(day, slotIndex, dragValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-lg p-4"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-primary" />
        <h3 className="font-semibold text-sm">Your Availability</h3>
      </div>

      <div className="flex gap-1">
        {/* Time labels */}
        <div className="flex flex-col gap-0.5 pr-1">
          <div className="h-5" /> {/* Spacer for day headers */}
          {TIME_SLOTS.map((time) => (
            <div key={time} className="h-5 text-[10px] text-muted-foreground flex items-center justify-end pr-1">
              {time}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {DAYS.map((day) => (
          <div key={day} className="flex-1 flex flex-col gap-0.5">
            <div className="h-5 text-[10px] font-medium text-center">{day}</div>
            {TIME_SLOTS.map((_, slotIndex) => {
              const isAvailable = availability[day]?.[slotIndex] || false;
              return (
                <motion.div
                  key={slotIndex}
                  className={cn(
                    "h-5 rounded-sm cursor-pointer transition-colors select-none",
                    isAvailable 
                      ? "bg-primary/80 hover:bg-primary" 
                      : "bg-muted/50 hover:bg-muted"
                  )}
                  onMouseDown={() => handleMouseDown(day, slotIndex)}
                  onMouseEnter={() => handleMouseEnter(day, slotIndex)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              );
            })}
          </div>
        ))}
      </div>

      <p className="text-[10px] text-muted-foreground mt-3 text-center">
        Click and drag to select your available times
      </p>
    </motion.div>
  );
}
