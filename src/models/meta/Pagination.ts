export class PageQuery {

    private static MAX_LIMIT: number = 100;

    constructor(private currentPage: number = 1, private limit: number = 10) {
        if (limit > PageQuery.MAX_LIMIT) {
            this.limit = PageQuery.MAX_LIMIT;
        }
    }

    getOffset(): number {
        return this.currentPage - 1;
    }

    getLimit(): number {
        return this.limit;
    }

    getCurrentPage(): number {
        return this.currentPage;
    }

    setCurrentPage(currentPage: number): void {
        this.currentPage = currentPage;
    }
}

export interface IPageResult<T> {
    total: number,
    per_page: number,
    pages: number,
    current_page: number,
    // last_page: string | null,
    // next_page_url: string | null,
    // prev_page_url: string | null,
    data: T[]
}

export class PageResult<T> {
    constructor(private pageQuery: PageQuery, private total: number, private data: T[], private url: string) {
        // console.log("Total",total);
    }

    makeQueryString(currentPage: number): string {
        return `${this.url}?current_page=${currentPage}&limit=${this.pageQuery.getLimit()}`;
    }

    hasPrevPage() {
        return this.pageQuery.getCurrentPage() > 1;
    }

    hasNextPage() {
        return this.total > ( this.pageQuery.getCurrentPage() * this.pageQuery.getLimit());
    }

    getPages() {
        return Math.ceil(this.total / this.pageQuery.getLimit());
    }
    paginate(): IPageResult<T> {
        const pageResult = {} as IPageResult<T>;
        pageResult.total = this.total;
        pageResult.per_page = this.pageQuery.getLimit();
        pageResult.pages = this.getPages();
        pageResult.current_page = this.pageQuery.getCurrentPage();
        pageResult.data = this.data;
        // pageResult.prev_page_url = this.hasPrevPage() ? this.makeQueryString(pageResult.current_page - 1) : null;
        // pageResult.next_page_url = this.hasNextPage() ? this.makeQueryString(pageResult.current_page + 1) : null;
        return pageResult;
    }
}
