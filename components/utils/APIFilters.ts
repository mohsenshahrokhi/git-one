import queryString from "query-string"

export default function APIFilters(query: string) {
    const splitQuery: string[] = query.split('&')
    console.log('APIFilters', splitQuery)
    const all: any = {}
    for (let key in splitQuery) {
        console.log('key', key)
    }
    // splitQuery.map((q) => {
    //     const w: string[] = q.split('=')
    //     all[w[0]] = w[1]
    // })
    console.log('all', all)

    return all
}

