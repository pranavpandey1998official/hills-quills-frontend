import React from "react";

const SectionHeader = ({title, className, subtitle}: {title: string, className?: string, subtitle?: string}) => {
    return (
      <div className="@container flex flex-row justify-between">
        <div className={`section-heading justify-between ${className}`}>
          <h2 className="text-lg @lg:text-2xl font-bold text-gray-900 ">
            <span className="section-bullet"></span>
            {title}
          </h2>
          <h2 className="text-sm text-gray-500">{subtitle}</h2>
        </div>
        <div></div>
      </div>
    )
}

export default SectionHeader;