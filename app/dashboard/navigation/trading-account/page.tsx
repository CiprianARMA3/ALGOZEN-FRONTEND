
import {PortfolioDistribution} from './components/AssetAllocation';
import {ProfitLossChart} from './components/GrossData';
import {ProfitLossTrend} from './components/Ratios';
import {AdvancedMetrics} from './components/AdvancedMetrics';
import {TradeActivity} from './components/TradeActivity';
import {TradingChart} from  './components/Equity';

export default function tradingAccount(){
    return(
        <>
            <PortfolioDistribution/>
            <ProfitLossChart/>
            <ProfitLossTrend/>
            <AdvancedMetrics/>
            <TradeActivity/>
            <TradingChart/>
        </>
    )
}