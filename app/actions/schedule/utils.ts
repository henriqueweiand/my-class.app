export function shiftNameByValue(value: number) {
    if (value <= 12) {
        return 'morning';
    } else if (value <= 18) {
        return 'afternoon';
    } else {
        return 'evening';
    }
}