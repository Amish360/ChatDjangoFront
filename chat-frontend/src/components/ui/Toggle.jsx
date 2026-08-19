import React from 'react';

const Toggle = ({ checked, onChange, label }) => (
  <label className="flex items-center justify-between gap-4 cursor-pointer select-none">
    {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
    <span
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? 'bg-[#a9c9ae]' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </span>
  </label>
);

export default Toggle;
