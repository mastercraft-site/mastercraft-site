# Search Launch Checklist

## Publish And Verify

1. Commit and push the changes to `main`; confirm the GitHub Pages deployment succeeds.
2. Check these production URLs return the expected content, not a 404 or the homepage HTML:
   - https://www.mastercraftautony.com/
   - https://www.mastercraftautony.com/robots.txt
   - https://www.mastercraftautony.com/sitemap.xml
3. In [Google Search Console](https://search.google.com/search-console), add the Domain property `mastercraftautony.com` and complete the DNS TXT verification Google provides. Google Ads is a separate product and does not replace Search Console.
4. Submit `https://www.mastercraftautony.com/sitemap.xml` under Sitemaps.
5. Inspect `https://www.mastercraftautony.com/` with URL Inspection, run the live test, and request indexing. Check Google's selected canonical after indexing.
   Prioritize the collision repair, insurance claims, mechanical repair, and body/paint URLs below as well. This requires access to your Search Console account and cannot be done from the local project alone.
6. Test the published homepage with [Rich Results Test](https://search.google.com/test/rich-results) and [PageSpeed Insights](https://pagespeed.web.dev/). LocalBusiness markup does not guarantee a special search appearance.
7. Add the site to [Bing Webmaster Tools](https://www.bing.com/webmasters/) and submit the same sitemap. You can import a verified Search Console property.

## Local Business Visibility

- Claim and verify the actual shop in [Google Business Profile](https://www.google.com/business/), not only Google Ads.
- Keep the business name, address, phone, website, opening hours, categories, and services accurate and consistent across the website and business listings.
- Replace the temporary shop image in the owner section with a real owner portrait using `site.owner` in `src/config.js`.
- Publish genuine repair photos and useful case studies explaining the damage, repair work, and outcome. Get appropriate customer permission for identifiable photos.
- Ask real customers for honest reviews using https://g.page/r/CTbgWKSTDGI3EBM/review and reply to reviews. Do not buy reviews, offer incentives, or filter requests to only satisfied customers.
- Add genuinely useful service pages or case studies when you have distinct information to publish. Do not duplicate near-identical pages for different neighborhoods.

## What The Site Now Provides

- A canonical homepage, local-service title and H1, descriptive metadata, and social-sharing images.
- Build-time prerendering so the public homepage is readable without executing the React application. React hydrates it for interactive features.
- Connected `AutoRepair`, `WebSite`, `WebPage`, and owner `Person` structured data. It intentionally omits self-serving review-rating markup.
- `robots.txt` allowing public crawling, with the local admin/API paths excluded. Robots rules are not authentication or a security control.
- Eight real static pages with unique titles, descriptions, canonical URLs, and one H1 per page. Service, breadcrumb, and FAQ structured data describe the corresponding visible content.
- A generated sitemap containing the eight canonical pages, repair images, and a content `lastmod` date for each page. Section anchors are not separate sitemap URLs.
- Descriptive alt text for content images. The repeated footer logo intentionally has empty alt text because it is decorative beside the business name.

## Ongoing Checks

- Use `npm run build` for deployment, not `vite build` alone: the npm command also prerenders the homepage. Keep the lockfile updated when dependencies change; CI uses `npm ci` on Node 24.
- Page content, titles, descriptions, paths, and content dates are in `src/data/pages.js`. When substantively changing a page, update its `lastmod` to the actual content-change date; builds must not advance every date automatically.
- When changing business facts, update the visible content and the base JSON-LD in `index.html` together. Keep the canonical URL, CNAME, robots sitemap reference, and sitemap URLs consistent.
- Add only real, indexable, canonical pages to the sitemap. Do not invent update dates or include admin URLs.
- Monitor Search Console indexing, crawl issues, impressions, clicks, and relevant local queries. Track actual customer calls and estimate requests separately.
- Ranking, crawling, indexing, and AI citations are not guaranteed. Ads do not purchase organic ranking. Google's [AI search guidance](https://developers.google.com/search/docs/appearance/ai-features) uses the same SEO foundations and does not require special AI files or special schema.

## Public Page URLs

- https://www.mastercraftautony.com/
- https://www.mastercraftautony.com/collision-repair/
- https://www.mastercraftautony.com/insurance-claims/
- https://www.mastercraftautony.com/mechanical-repair/
- https://www.mastercraftautony.com/body-paint/
- https://www.mastercraftautony.com/reviews/
- https://www.mastercraftautony.com/about/
- https://www.mastercraftautony.com/faq/

The trailing slash matches GitHub Pages directory hosting. Each route is generated as its own `index.html`, so it can load directly without JavaScript.

## Facts Still To Confirm

- The saved reviews by Syed Asghar, mian azhar, and Touchstone Services end in ellipses. They remain labeled excerpts with links to Google. Supply their exact complete text before treating them as full reviews.
- No named ASE/I-CAR or other certification is invented. Supply current, verified certification details before adding specific credentials.
- The warranty and rental-car FAQ answers tell customers to contact the shop. They do not promise a warranty, a loaner, a free rental, or insurance payment; supply the actual policies to make these answers more specific.

## AI Crawler Access

The public `robots.txt` explicitly permits Googlebot, Bingbot, OAI-SearchBot, GPTBot, and PerplexityBot while excluding admin/API paths. Check the published file after deployment and ensure any CDN or firewall does not challenge legitimate crawler requests.

OAI-SearchBot concerns OpenAI search discovery; GPTBot concerns model training. Allowing GPTBot is not a requirement for search visibility. PerplexityBot is a search crawler. Crawl permission and FAQ schema do not guarantee citations, indexing, rankings, or Google FAQ rich results.