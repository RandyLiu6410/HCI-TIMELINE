export default interface NewsModel {
    url: string;
    title: string;
    source: string;
    author: string;
    description: string;
    content: string[];
    publishedAt: string;
    tags: string[];
    urlToImage: string;
}