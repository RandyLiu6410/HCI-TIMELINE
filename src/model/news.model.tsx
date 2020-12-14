export default interface NewsModel {
    id: string,
    source: string;
    title: string;
    content: string[];
    publishedAt: string;
    tags: string[];
    type: string;
    url: string;
    urlToImage: string;
}