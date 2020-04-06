export enum CoordType {
    wgs84ll = 1,
    gcj02ll = 2,
    bd09ll = 3,
    bd09mc = 4,
}

export function createPlaceApiUrl(
    ak: string,
    bounds: number[][],
    keyword: string,
    coordType: CoordType,
    pageNum: number
) {
    if (bounds[0][1] >= bounds[1][1] || bounds[0][0] >= bounds[1][0]) {
        return null;
    }
    const baseUrl = 'http://api.map.baidu.com/place/v2/search'
    const url = `${baseUrl}?query=${keyword}&page_size=20&page_num=${pageNum}&bounds=${bounds[0][1]},${bounds[0][0]},${bounds[1][1]},${bounds[1][0]}&ret_coordtype=${CoordType[coordType]}&scope=2&output=json&ak=${ak}`
    return url;
}