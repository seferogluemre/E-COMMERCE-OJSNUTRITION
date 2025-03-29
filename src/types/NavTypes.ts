export interface SubChild {
    name: string;
    slug: string;
    order: number;
}

export interface Child {
    id: string;
    name: string;
    slug: string;
    order: number;
    sub_children?: SubChild[];
}

export interface TopSeller {
    name: string;
    slug: string;
    description: string;
    picture_src: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    order: number;
    children: Child[];
    top_sellers: TopSeller[];
}

export interface LinksProps {
    Link: string;
    to: string;
    category: string;
}
