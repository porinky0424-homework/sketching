import { Position } from '../constants/types/position';

export const calcDistance = (pos1: Position, pos2: Position) => (
    Math.sqrt(Math.pow((pos1.x - pos2.x), 2) + Math.pow((pos1.y - pos2.y), 2))
)
