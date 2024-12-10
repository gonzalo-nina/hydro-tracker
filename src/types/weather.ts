export interface WeatherData {
    name: string;
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
    }>;
  }