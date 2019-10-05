class TimeseriesSimulator {
    init = () => {
        return {
            xData: (() => {
                let now = new Date();
                const res = [];
                let len = 50;
                while (len--) {
                    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                    now = new Date(now.valueOf() - 1000);
                }
                return res;
            })(),
            yData: Array.from({ length: 50 }, () => ((Math.random() * 10) + 5) - 0),
        };
    }

    random = () => {
        return {
            xData: (new Date()).toLocaleTimeString().replace(/^\D*/, ''),
            yData: (Math.random() * 10 + 5) - 0,
        };
    };
}

export default TimeseriesSimulator;
