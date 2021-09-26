import { ColorLevelLog } from '../../enums/logs/ColorLevelLog'

export class Color {
    getLevel(level: string) {
        switch (level) {
            case 'CRITICAL':
                return ColorLevelLog.CRITICAL
            case 'ERROR':
                return ColorLevelLog.ERROR
            case 'WARNING':
                return ColorLevelLog.WARNING
            case 'DEBUG':
                return ColorLevelLog.DEBUG
            default:
                return ColorLevelLog.INFO
        }
    }
}
