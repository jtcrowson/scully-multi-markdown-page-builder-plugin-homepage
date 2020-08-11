import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
    isDevMode
  } from '@angular/core';
  import { NavigationEnd, Router } from '@angular/router';
  import { filter, take, tap } from 'rxjs/operators';
import { ScullyRoutesService } from '@scullyio/ng-lib';
  
  interface ScullyContent {
    html: string;
    cssId: string;
  }
  declare global {
    interface Window {
      scullyHomepageContent: ScullyContent;
    }
  }
  /** this is needed, because otherwise the CLI borks while building */
  const scullyBegin = '<!--scullyHomepageContent-begin-->';
  const scullyEnd = '<!--scullyHomepageContent-end-->';
  
  @Component({
    // tslint:disable-next-line: component-selector
    selector: 'scully-homepage-content',
    template: '<ng-content></ng-content>',
    styles: [
      `
        :host {
          display: none;
        }
        scully-homepage-content {
          display: none;
        }
      `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: true
  })
  export class ScullyHomepageContentComponent implements OnDestroy, OnInit {
    elm = this.elmRef.nativeElement as HTMLElement;
    /** placeholder */
    lastHandled: string;
    /** pull in all  available routes into an eager promise */
    // routes = this.srs.allRoutes$.pipe(take(1)).toPromise();
    /** monitor the router, so we can update while navigating in the same 'page' see #311 */
    // routeUpdates$ = this.router.events.pipe(
    //   filter(ev => ev instanceof NavigationEnd),
    //   /** don't replace if we are already there */
    //   filter(
    //     (ev: NavigationEnd) =>
    //       this.lastHandled && !this.lastHandled.endsWith(ev.urlAfterRedirects)
    //   ),
    //   tap(r => this.replaceContent())
    // );
  
    // routeSub = this.routeUpdates$.subscribe();
  
    constructor(
      private elmRef: ElementRef,
      private srs: ScullyRoutesService,
      private router: Router
    ) {
      /** do this from constructor, so it runs ASAP */
      console.log('ok?');
    }
  
    ngOnInit(): void {
        console.log(5);
      if (this.elm) {
        /** this will only fire in a browser environment */
        console.log(6);
        this.handlePage();
      }
    }
  
    /**
     * Loads the static content from scully into the view
     * Will fetch the content from sibling links with xmlHTTPrequest
     */
    private async handlePage() {
        console.log('hjere ');
      const curPage = basePathOnly(location.href);
      if (this.lastHandled === curPage) {
        /**
         * Due to the fix we needed for #311
         * it might happen that this routine is called
         * twice for the same page.
         * this code will make sure the second one is ignored.
         */
        return;
      }
      console.log(curPage);
      this.lastHandled = curPage;
      const template = document.createElement('template');
      const currentCssId = this.getCSSId(this.elm);
    //   if (window.scullyContent) {
    //     console.log('here1');
    //     /** upgrade existing static content */
    //     const htmlString = window.scullyContent.html;
    //     if (currentCssId !== window.scullyContent.cssId) {
    //       /** replace the angular cssId */
    //       template.innerHTML = htmlString
    //         .split(window.scullyContent.cssId)
    //         .join(currentCssId);
    //     } else {
    //         console.log('tehraea');
    //       template.innerHTML = htmlString;
    //     }
    //   } else {
          console.log('here342');
        /**
         *   NOTE
         * when updateting the texts for the errors, make sure you leave the
         *  `id="___scully-parsing-error___"`
         * in there. That way users can detect rendering errors in their CI
         * on a reliable way.
         */
        await fetchHttp(curPage + '/index.html', 'text')
          .catch(e => {
            if (isDevMode()) {
              const uri = new URL(location.href);
              const url = `http://localhost:1668/${basePathOnly(
                uri.pathname
              )}/index.html`;
              return fetchHttp(url, 'text');
            } else {
              throw new Error(e);
            }
          })
          .then((html: string) => {
            try {
              const htmlString = html.split(scullyBegin)[1].split(scullyEnd)[0];
              if (htmlString.includes('_ngcontent')) {
                /** update the angular cssId */
                const atr =
                  '_ngcontent' + htmlString.split('_ngcontent')[1].split('=')[0];
                template.innerHTML = htmlString.split(atr).join(currentCssId);
              }
            } catch (e) {
              template.innerHTML = `<h2 id="___scully-parsing-error___">Sorry, could not parse static page content</h2>
              <p>This might happen if you are not using the static generated pages.</p>`;
            }
          })
          .catch(e => {
            template.innerHTML =
              '<h2 id="___scully-parsing-error___">Sorry, could not load static page content</h2>';
            console.error('problem during loading static scully content', e);
          });
    //   }
      /** insert the whole thing just before the `<scully-content>` element */
      const parent = this.elm.parentElement || document.body;
      const begin = document.createComment('scullyHomepageContent-begin');
      const end = document.createComment('scullyHomepageContent-end');
      parent.insertBefore(begin, this.elm);
      parent.insertBefore(template.content, this.elm);
      parent.insertBefore(end, this.elm);
      /** upgrade all hrefs to simulated routelinks (in next microtask) */
    //   setTimeout(
    //     () =>
    //       document
    //         .querySelectorAll('[href]')
    //         // .forEach(this.upgradeToRoutelink.bind(this)),
    //     10
    //   );
      // document.querySelectorAll('[href]').forEach(this.upgradeToRoutelink.bind(this));
    }
  
    // /**
    //  * upgrade a **href** attributes to links that respect the Angular router
    //  * and don't do a full page reload. Only works on links that are found in the
    //  * Scully route config file.
    //  * @param elm the element containing the **hrefs**
    //  */
    // async upgradeToRoutelink(elm: HTMLElement) {
    //   const routes = await this.routes;
    //   const lnk = basePathOnly(elm.getAttribute('href').toLowerCase());
    //   const route = routes.find(r => basePathOnly(r.route.toLowerCase()) === lnk);
  
    //   /** only upgrade routes known by scully. */
    //   if (lnk && route && !lnk.startsWith('#')) {
    //     elm.onclick = async (ev: MouseEvent) => {
    //       const splitRoute = route.route.split(`/`);
    //       const curSplit = location.pathname.split('/');
    //       // loose last "part" of route
    //       curSplit.pop();
  
    //       ev.preventDefault();
    //       const routed = await this.router.navigate(splitRoute).catch(e => {
    //         console.error('routing error', e);
    //         return false;
    //       });
    //       if (!routed) {
    //         return;
    //       }
  
    //     //   /** check for the same route with different "data", and NOT a 1 level higher (length) */
    //     //   if (
    //     //     curSplit.every((part, i) => splitRoute[i] === part) &&
    //     //     splitRoute.length !== curSplit.length + 1
    //     //   ) {
    //     //     setTimeout(() => this.replaceContent(), 10); // a small delay, so we are sure the angular parts in the page are settled enough
    //     //   }
    //     };
    //   }
    // }
  
    getCSSId(elm: HTMLElement) {
      return (
        elm.getAttributeNames().find(a => a.startsWith('_ngcontent')) ||
        'none_found'
      );
    }
  
    ngOnDestroy() {
    //   this.routeSub.unsubscribe();
    }
  }
  
  export function fetchHttp<T>(
    url: string,
    responseType: XMLHttpRequestResponseType = 'json'
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = responseType;
      xhr.addEventListener('load', ev => {
        if (xhr.status !== 200) {
          return reject(xhr);
        }
        resolve(xhr.response);
      });
      xhr.addEventListener('error', (...err) => reject(err));
      xhr.open('get', url, true);
      xhr.send();
    });
  }
  
  export function findComments(rootElem: HTMLElement, searchText?: string) {
    const comments = [];
    // Fourth argument, which is actually obsolete according to the DOM4 standard, seems required in IE 11
    const iterator = document.createNodeIterator(
      rootElem,
      NodeFilter.SHOW_COMMENT,
      {
        acceptNode: node => {
          // Logic to determine whether to accept, reject or skip node
          // In this case, only accept nodes that have content
          // that is containing our searchText, by rejecting any other nodes.
          if (
            searchText &&
            node.nodeValue &&
            !node.nodeValue.includes(searchText)
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
      // , false // IE-11 support requires this parameter.
    );
    let curNode;
    // tslint:disable-next-line: no-conditional-assignment
    while ((curNode = iterator.nextNode())) {
      comments.push(curNode);
    }
    return comments;
  }

  export const basePathOnly = (str: string): string => {
    if (str.includes('#')) {
      str = str.split('#')[0];
    }
    if (str.includes('?')) {
      str = str.split('?')[0];
    }
    const cleanedUpVersion = str.endsWith('/') ? str.slice(0, -1) : str;
    return cleanedUpVersion;
  };
  