
// TODO: Theres probably a nicer way to type this
// The levels can be arbitrarily deep, so this is more an example 
// than a fully typed interface.


/**
 * We store the path in a de-normalized format to make querying easier
 * Along with the date tags this means we can quickly build a view of the
 * most active forums/votes for time period and section of the forum.
 *  
 */
export interface PathTags {
  
  /** 
   * The full path of the forum 
   * Categories are seperated by a '_' characther. 
  `*/
  path0: string 
  
  /**
   * The path with the (1st) last segment removed
   */
  path1?: string 

  /**
   * The path with the 2nd last segment removed
   */
  path2?: string


  /**
   * The first segment of the forum path
   */
  segment0: string 
  
  /**
   * The second segment of the forum path
   */
  segment1?: string
  
  /**
   * The third segment of the forum path
   */ 
  segment2?: string
  
  /**
   * The number of path segments
   */
  segCount: string;


}

export function copyPathTags(source: any, target: any) {
  Object.keys(source).forEach(key => {
    if (key.startsWith('path') || key.startsWith('segment')) {
      target[key] = source[key]
    }
  })
  target.segCount = source.segCount;
}

export function extractPathSegmentsFromTags(source: Record<string, string>): string[] {
  const n = parseInt(source.segCount);
  if (Number.isNaN(n)) {
    console.log(source);
    throw new Error('Not a valid tags object passed in, cant extract path segments');
  }
  const segments: string[] = [];
  for (let i = 0; i < n; i++) {
    const seg = source[`segment${i}`]
    console.log(`segment${i} = ${seg}`);
    if(!seg || typeof seg !== 'string') {
      throw new Error('Malformed tags')
    } 
    segments.push(seg);
  }
  return segments;
}