export default interface NewsModel {
    id: string,
    source: string;
    title: string;
    context: string[];
    postTime: number;
    country: string;
    tags: string[];
    type: string;
    images: {src: string, priority: number}[]
}