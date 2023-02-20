---
title: "Change Pagination in Odoo15"
description: "Change Pagination in Odoo15"
date: 2023-02-21T04:51:54+07:00
cover: false
fullscreen: false
draft: false
summary: In this article, i add a way to implement custom pagination numbering with ellipsis in the middle of the page number, and to make sure that first and last page will always be shown.
---

Currently odoo eCommerce is already good to start somewhere. But sometimes, client want to change something that are not covered in odoo base. For example, they want to change the style of pagination, they want to change the numbering, or they want to completely changes the style and have an ellipsis with first and last page always shown. In this article, i will share how to achieve that behavior in Odoo15.

As for some styling, we can easily create new css or even directly change the style via Website Editor. But, to populate the pagination data, it's applied in the backend. So, we need to create a new module to override the default behavior.

### Implementation
We can trace the code to find how Odoo implement pagination. As for eCommerce, it's first called from controller `def shop()` in module `website_sale`, then if we search the initialization of that method `def pager()`, we can see that it's initialized from portal controller. But, we found that there is a wrapper inside model `website` where it directly call the portal, so it's easier to just override the method `pager` in `website` model than override them from the controller, because as we see in the controller `def shop()`, it's just call the method `def pager()` from model `website`.

So now, we can create new module and inherit model `website` and override the method `pager()`.

Original method from module `website` on file `website/models/website.py`
```python
@api.model
def pager(self, url, total, page=1, step=30, scope=5, url_args=None):
    return pager(url, total, page=page, step=step, scope=scope, url_args=url_args)
```

And now, we can override the method `pager()` in our new module
```python
@api.model
def pager(self, url, total, page=1, step=30, scope=5, url_args=None):
    res = super(Website, self).pager(url, total, page=page, step=step, scope=scope, url_args=url_args)

    return res
```
In the code above, we override the method `pager()`, and call the super method `super(Website, self).pager()` to get the original result. Then, we can modify the result as we want.

If you try to check the result of `res` variable, you will see that it's a dictionary with some keys. The most important keys are `page_count`, `page`, and `pages`. `page_count` is the total page, `page` is the current page, and `pages` is the list of page number that will be shown in the pagination.

Since we're going to change how pagination number will be shown, we just need to replace the `pages` key, but still need the total page and current page to compute where ellipsis should be shown. In the example below, it will show the first and last page, and if there is a gap atleast 3 page between the current page and the first or last page, it will show ellipsis instead of the number.
```python
@api.model
def pager(self, url, total, page=1, step=30, scope=5, url_args=None):
    res = super(Website, self).pager(url, total, page=page, step=step, scope=scope, url_args=url_args)
    def get_url(page):
        _url = "%s/page/%s" % (url, page) if page > 1 else url
        if url_args:
            _url = "%s?%s" % (_url, urls.url_encode(url_args))
        return _url

    def get_pager(pcurr, ptotal):
        delta = 2 # number of pages to show before and after current page
        left = pcurr - delta
        right = pcurr + delta + 1
        pages = []
        pagesWithEllipsis = []

        for page in range(1, ptotal+1):
            if page == 1 or page == ptotal or (page >= left and page < right):
                pages.append(page)
        
        ellips = False
        for page in pages:
            if ellips:
                if page - ellips == 2:
                    pagesWithEllipsis.append({'url': get_url(ellips + 1), 'num': ellips + 1})
                elif page - ellips != 1:
                    pagesWithEllipsis.append({'url': None, 'num': '...'})
            pagesWithEllipsis.append({'url': get_url(page), 'num': page})
            ellips = page

        return pagesWithEllipsis

    res['pages'] = get_pager(res['page']['num'], res['page_count'])

    return res
```

And, here is the result
1. First page
    {{< img src="img/curr-page-1.png" alt="current page is 1 (first page)" >}}
2. Middle page
    {{< img src="img/curr-page-6.png" alt="current page is 6 (middle page)" >}}
3. Almost last page
    {{< img src="img/curr-page-952.png" alt="current page is 952 (almost last page)" >}}

Okay, that's it. This article is just specific case where client want to change the pagination style, but you can always modify the code to fit your need.
> Module: [website_pagination](https://github.com/rockavoldy/odoo-modules/tree/15.0/website_pagination)
