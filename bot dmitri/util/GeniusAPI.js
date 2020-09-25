// export interface SearchResult {
//     meta: Meta;
//     response: Response;
//   }
  
//   export interface Meta {
//     status: number;
//   }
  
//   export interface Response {
//     hits: Hit[];
//   }
  
//   export interface Hit {
//     highlights: any[];
//     index: Index;
//     type: Index;
//     result: Result;
//   }
  
//   export enum Index {
//     Song = 'song',
//   }
  
//   export interface Result {
//     annotationCount: number;
//     apiPath: string;
//     fullTitle: string;
//     headerImageThumbnailUrl: string;
//     headerImageUrl: string;
//     id: number;
//     lyricsOwnerId: number;
//     lyricsState: LyricsState;
//     path: string;
//     pyongsCount: number | null;
//     songArtImageThumbnailUrl: string;
//     songArtImageUrl: string;
//     stats: Stats;
//     title: string;
//     titleWithFeatured: string;
//     url: string;
//     primaryArtist: PrimaryArtist;
//   }
  
//   export enum LyricsState {
//     Complete = 'complete',
//   }
  
//   export interface PrimaryArtist {
//     apiPath: string;
//     headerImageUrl: string;
//     id: number;
//     imageUrl: string;
//     isMemeVerified: boolean;
//     isVerified: boolean;
//     name: string;
//     url: string;
//     iq?: number;
//   }
  
//   export interface Stats {
//     unreviewedAnnotations: number;
//     concurrents?: number;
//     hot: boolean;
//     pageviews?: number;
//   }
  
//   // Converts JSON strings to/from your types
//   // and asserts the results of JSON.parse at runtime
//   export class Convert {
//     public static toSearchResult (json: string): SearchResult {
//       return cast(JSON.parse(json), r('SearchResult'))
//     }
  
//     public static searchResultToJson (value: SearchResult): string {
//       return JSON.stringify(uncast(value, r('SearchResult')), null, 2)
//     }
  
//     public static toMeta (json: string): Meta {
//       return cast(JSON.parse(json), r('Meta'))
//     }
  
//     public static metaToJson (value: Meta): string {
//       return JSON.stringify(uncast(value, r('Meta')), null, 2)
//     }
  
//     public static toResponse (json: string): Response {
//       return cast(JSON.parse(json), r('Response'))
//     }
  
//     public static responseToJson (value: Response): string {
//       return JSON.stringify(uncast(value, r('Response')), null, 2)
//     }
  
//     public static toHit (json: string): Hit {
//       return cast(JSON.parse(json), r('Hit'))
//     }
  
//     public static hitToJson (value: Hit): string {
//       return JSON.stringify(uncast(value, r('Hit')), null, 2)
//     }
  
//     public static toResult (json: string): Result {
//       return cast(JSON.parse(json), r('Result'))
//     }
  
//     public static resultToJson (value: Result): string {
//       return JSON.stringify(uncast(value, r('Result')), null, 2)
//     }
  
//     public static toPrimaryArtist (json: string): PrimaryArtist {
//       return cast(JSON.parse(json), r('PrimaryArtist'))
//     }
  
//     public static primaryArtistToJson (value: PrimaryArtist): string {
//       return JSON.stringify(uncast(value, r('PrimaryArtist')), null, 2)
//     }
  
//     public static toStats (json: string): Stats {
//       return cast(JSON.parse(json), r('Stats'))
//     }
  
//     public static statsToJson (value: Stats): string {
//       return JSON.stringify(uncast(value, r('Stats')), null, 2)
//     }
//   }
  
//   function invalidValue (typ: any, val: any): never {
//     throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`)
//   }
  
//   function jsonToJSProps (typ: any): any {
//     if (typ.jsonToJS === undefined) {
//       var map: any = {}
//       typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ })
//       typ.jsonToJS = map
//     }
//     return typ.jsonToJS
//   }
  
//   function jsToJSONProps (typ: any): any {
//     if (typ.jsToJSON === undefined) {
//       var map: any = {}
//       typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ })
//       typ.jsToJSON = map
//     }
//     return typ.jsToJSON
//   }
  
//   function transform (val: any, typ: any, getProps: any): any {
//     function transformPrimitive (typ: string, val: any): any {
//       if (typeof typ === typeof val) return val
//       return invalidValue(typ, val)
//     }
  
//     function transformUnion (typs: any[], val: any): any {
//       // val must validate against one typ in typs
//       var l = typs.length
//       for (var i = 0; i < l; i++) {
//         var typ = typs[i]
//         try {
//           return transform(val, typ, getProps)
//         } catch (_) {}
//       }
//       return invalidValue(typs, val)
//     }
  
//     function transformEnum (cases: string[], val: any): any {
//       if (cases.indexOf(val) !== -1) return val
//       return invalidValue(cases, val)
//     }
  
//     function transformArray (typ: any, val: any): any {
//       // val must be an array with no invalid elements
//       if (!Array.isArray(val)) return invalidValue('array', val)
//       return val.map(el => transform(el, typ, getProps))
//     }
  
//     function transformDate (typ: any, val: any): any {
//       if (val === null) {
//         return null
//       }
//       const d = new Date(val)
//       if (isNaN(d.valueOf())) {
//         return invalidValue('Date', val)
//       }
//       return d
//     }
  
//     function transformObject (props: { [k: string]: any }, additional: any, val: any): any {
//       if (val === null || typeof val !== 'object' || Array.isArray(val)) {
//         return invalidValue('object', val)
//       }
//       var result: any = {}
//       Object.getOwnPropertyNames(props).forEach(key => {
//         const prop = props[key]
//         const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined
//         result[prop.key] = transform(v, prop.typ, getProps)
//       })
//       Object.getOwnPropertyNames(val).forEach(key => {
//         if (!Object.prototype.hasOwnProperty.call(props, key)) {
//           result[key] = transform(val[key], additional, getProps)
//         }
//       })
//       return result
//     }
  
//     if (typ === 'any') return val
//     if (typ === null) {
//       if (val === null) return val
//       return invalidValue(typ, val)
//     }
//     if (typ === false) return invalidValue(typ, val)
//     while (typeof typ === 'object' && typ.ref !== undefined) {
//       typ = typeMap[typ.ref]
//     }
//     if (Array.isArray(typ)) return transformEnum(typ, val)
//     if (typeof typ === 'object') {
//       return typ.hasOwnProperty('unionMembers') ? transformUnion(typ.unionMembers, val)
//         : typ.hasOwnProperty('arrayItems') ? transformArray(typ.arrayItems, val)
//           : typ.hasOwnProperty('props') ? transformObject(getProps(typ), typ.additional, val)
//             : invalidValue(typ, val)
//     }
//     // Numbers can be parsed by Date but shouldn't be.
//     if (typ === Date && typeof val !== 'number') return transformDate(typ, val)
//     return transformPrimitive(typ, val)
//   }
  
//   function cast<T> (val: any, typ: any): T {
//     return transform(val, typ, jsonToJSProps)
//   }
  
//   function uncast<T> (val: T, typ: any): any {
//     return transform(val, typ, jsToJSONProps)
//   }
  
//   function a (typ: any) {
//     return { arrayItems: typ }
//   }
  
//   function u (...typs: any[]) {
//     return { unionMembers: typs }
//   }
  
//   function o (props: any[], additional: any) {
//     return { props, additional }
//   }
  
//   function m (additional: any) {
//     return { props: [], additional }
//   }
  
//   function r (name: string) {
//     return { ref: name }
//   }
  
//   const typeMap: any = {
//     SearchResult: o([
//       { json: 'meta', js: 'meta', typ: r('Meta') },
//       { json: 'response', js: 'response', typ: r('Response') }
//     ], false),
//     Meta: o([
//       { json: 'status', js: 'status', typ: 0 }
//     ], false),
//     Response: o([
//       { json: 'hits', js: 'hits', typ: a(r('Hit')) }
//     ], false),
//     Hit: o([
//       { json: 'highlights', js: 'highlights', typ: a('any') },
//       { json: 'index', js: 'index', typ: r('Index') },
//       { json: 'type', js: 'type', typ: r('Index') },
//       { json: 'result', js: 'result', typ: r('Result') }
//     ], false),
//     Result: o([
//       { json: 'annotation_count', js: 'annotationCount', typ: 0 },
//       { json: 'api_path', js: 'apiPath', typ: '' },
//       { json: 'full_title', js: 'fullTitle', typ: '' },
//       { json: 'header_image_thumbnail_url', js: 'headerImageThumbnailUrl', typ: '' },
//       { json: 'header_image_url', js: 'headerImageUrl', typ: '' },
//       { json: 'id', js: 'id', typ: 0 },
//       { json: 'lyrics_owner_id', js: 'lyricsOwnerId', typ: 0 },
//       { json: 'lyrics_state', js: 'lyricsState', typ: r('LyricsState') },
//       { json: 'path', js: 'path', typ: '' },
//       { json: 'pyongs_count', js: 'pyongsCount', typ: u(0, null) },
//       { json: 'song_art_image_thumbnail_url', js: 'songArtImageThumbnailUrl', typ: '' },
//       { json: 'song_art_image_url', js: 'songArtImageUrl', typ: '' },
//       { json: 'stats', js: 'stats', typ: r('Stats') },
//       { json: 'title', js: 'title', typ: '' },
//       { json: 'title_with_featured', js: 'titleWithFeatured', typ: '' },
//       { json: 'url', js: 'url', typ: '' },
//       { json: 'primary_artist', js: 'primaryArtist', typ: r('PrimaryArtist') }
//     ], false),
//     PrimaryArtist: o([
//       { json: 'api_path', js: 'apiPath', typ: '' },
//       { json: 'header_image_url', js: 'headerImageUrl', typ: '' },
//       { json: 'id', js: 'id', typ: 0 },
//       { json: 'image_url', js: 'imageUrl', typ: '' },
//       { json: 'is_meme_verified', js: 'isMemeVerified', typ: true },
//       { json: 'is_verified', js: 'isVerified', typ: true },
//       { json: 'name', js: 'name', typ: '' },
//       { json: 'url', js: 'url', typ: '' },
//       { json: 'iq', js: 'iq', typ: u(undefined, 0) }
//     ], false),
//     Stats: o([
//       { json: 'unreviewed_annotations', js: 'unreviewedAnnotations', typ: 0 },
//       { json: 'concurrents', js: 'concurrents', typ: u(undefined, 0) },
//       { json: 'hot', js: 'hot', typ: true },
//       { json: 'pageviews', js: 'pageviews', typ: u(undefined, 0) }
//     ], false),
//     Index: [
//       'song'
//     ],
//     LyricsState: [
//       'complete'
//     ]
//   }