declare module "react-data-table-component-extensions"
declare module 'react-timeline-range-slider' {
    import * as React from 'react';

    interface RangeSliderProps {
        min?: number;
        max?: number;
        step?: number;
        values: number[];
        onChange: (values: number[]) => void;
        renderMark?: (value: number) => React.ReactNode;
        // Agrega más props según la documentación de la biblioteca
    }

    export const RangeSlider: React.FC<RangeSliderProps>;
}
