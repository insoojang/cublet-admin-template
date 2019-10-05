declare const PUBLIC_URL: string;

declare namespace echarts {
    namespace EChartOption {
        /**
         * Line style
         */
        interface LineStyle {
            color?: string | string[] | any;
            width?: number;
            type?: 'solid' | 'dashed' | 'dotted';
            shadowBlur?: number;
            shadowColor?: string;
            shadowOffsetX?: number;
            shadowOffsetY?: number;
            opacity?: number;
        }
    }
}
