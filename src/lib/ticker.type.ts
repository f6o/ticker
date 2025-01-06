interface TickerLayout {
    width: number,
    height: number;
    textColor: string;
    tickerColor: string;
    backgroundColor: string;
    foregroundColor: string;
}

interface PlayerData {
    name: string;
    wins: number;
}

interface TickerData {
    centerText: string;
    slit1: string;
    slit2: string;
    p1: PlayerData;
    p2: PlayerData;
}