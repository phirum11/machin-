import React, { useState, useEffect, useRef, useCallback } from 'react';

const PriceSlider = ({ min = 0, max = 1000, value, onChange }) => {
  const [minValue, setMinValue] = useState(value?.min || min);
  const [maxValue, setMaxValue] = useState(value?.max || max);
  const [isDragging, setIsDragging] = useState(null); // 'min' | 'max' | null
  const trackRef = useRef(null);

  useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxValue - 10);
    setMinValue(newMin);
    onChange?.({ min: newMin, max: maxValue });
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minValue + 10);
    setMaxValue(newMax);
    onChange?.({ min: minValue, max: newMax });
  };

  const pct = (v) => ((v - min) / (max - min)) * 100;
  const leftPct = pct(minValue);
  const rightPct = pct(maxValue);

  const formatPrice = (v) =>
    v >= 1000 ? `$${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k` : `$${v}`;

  return (
    <div className="w-full space-y-5">
      {/* ── Selected range pill ──────────────────────────────────── */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-full">
          <span className="text-sm font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
            {formatPrice(minValue)}
          </span>
          <span className="w-4 h-px bg-indigo-300" />
          <span className="text-sm font-bold bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
            {formatPrice(maxValue)}
          </span>
        </div>
      </div>

      {/* ── Slider track ─────────────────────────────────────────── */}
      <div className="relative h-7 flex items-center" ref={trackRef}>
        {/* Background track */}
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />

        {/* Active range track (gradient) */}
        <div
          className="absolute h-1.5 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] shadow-sm shadow-indigo-500/20 transition-all duration-75"
          style={{
            left: `${leftPct}%`,
            width: `${rightPct - leftPct}%`
          }}
        />

        {/* Tooltip for min */}
        {isDragging === 'min' && (
          <div
            className="absolute -top-8 -translate-x-1/2 px-2 py-0.5 rounded-md bg-gray-800 text-white text-[11px] font-bold whitespace-nowrap shadow-lg pointer-events-none z-10"
            style={{ left: `${leftPct}%` }}
          >
            ${minValue}
          </div>
        )}

        {/* Tooltip for max */}
        {isDragging === 'max' && (
          <div
            className="absolute -top-8 -translate-x-1/2 px-2 py-0.5 rounded-md bg-gray-800 text-white text-[11px] font-bold whitespace-nowrap shadow-lg pointer-events-none z-10"
            style={{ left: `${rightPct}%` }}
          >
            ${maxValue}
          </div>
        )}

        {/* Min range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={5}
          value={minValue}
          onChange={handleMinChange}
          onMouseDown={() => setIsDragging('min')}
          onMouseUp={() => setIsDragging(null)}
          onTouchStart={() => setIsDragging('min')}
          onTouchEnd={() => setIsDragging(null)}
          className="absolute w-full appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#4F46E5]
            [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-indigo-500/20
            [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:active:scale-110
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:ring-0 [&::-webkit-slider-thumb]:hover:ring-4 [&::-webkit-slider-thumb]:hover:ring-indigo-500/10
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#4F46E5]
            [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-grab
            [&::-moz-range-thumb]:pointer-events-auto"
          style={{ zIndex: minValue > max - 100 ? 3 : 2 }}
        />

        {/* Max range input */}
        <input
          type="range"
          min={min}
          max={max}
          step={5}
          value={maxValue}
          onChange={handleMaxChange}
          onMouseDown={() => setIsDragging('max')}
          onMouseUp={() => setIsDragging(null)}
          onTouchStart={() => setIsDragging('max')}
          onTouchEnd={() => setIsDragging(null)}
          className="absolute w-full appearance-none bg-transparent pointer-events-none
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[#7C3AED]
            [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-purple-500/20
            [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:active:scale-110
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:ring-0 [&::-webkit-slider-thumb]:hover:ring-4 [&::-webkit-slider-thumb]:hover:ring-purple-500/10
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[#7C3AED]
            [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-grab
            [&::-moz-range-thumb]:pointer-events-auto"
          style={{ zIndex: 2 }}
        />
      </div>

      {/* ── Price inputs ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
            $
          </span>
          <input
            type="number"
            value={minValue}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= min && val <= maxValue - 10) {
                setMinValue(val);
                onChange?.({ min: val, max: maxValue });
              }
            }}
            className="w-full pl-6 pr-1.5 py-1.5 text-sm font-semibold text-gray-700 border-2 border-gray-100 bg-gray-50 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-500/10 focus:bg-white outline-none transition-all"
          />
        </div>

        <div className="w-4 h-0.5 bg-gray-200 rounded-full flex-shrink-0" />

        <div className="flex-1 relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
            $
          </span>
          <input
            type="number"
            value={maxValue}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val <= max && val >= minValue + 10) {
                setMaxValue(val);
                onChange?.({ min: minValue, max: val });
              }
            }}
            className="w-full pl-6 pr-1.5 py-1.5 text-sm font-semibold text-gray-700 border-2 border-gray-100 bg-gray-50 rounded-lg focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-500/10 focus:bg-white outline-none transition-all"
          />
        </div>
      </div>

      {/* ── Quick preset buttons ─────────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5">
        {[
          { label: 'Under $50', min: 0, max: 50 },
          { label: '$50-$200', min: 50, max: 200 },
          { label: '$200-$500', min: 200, max: 500 },
          { label: '$500+', min: 500, max: 1000 }
        ].map((preset) => {
          const isActive = minValue === preset.min && maxValue === preset.max;
          return (
            <button
              key={preset.label}
              onClick={() => {
                setMinValue(preset.min);
                setMaxValue(preset.max);
                onChange?.({ min: preset.min, max: preset.max });
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-sm shadow-indigo-500/25'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PriceSlider;
