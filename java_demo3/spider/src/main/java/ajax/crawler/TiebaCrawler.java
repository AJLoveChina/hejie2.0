package ajax.crawler;

import cn.edu.hfut.dmic.webcollector.crawler.BreadthCrawler;
import cn.edu.hfut.dmic.webcollector.model.Links;
import cn.edu.hfut.dmic.webcollector.model.Page;
import java.util.regex.Pattern;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import ajax.model.entity.Tieba;

public class TiebaCrawler extends BreadthCrawler{
	
    public TiebaCrawler(String crawlPath, boolean autoParse) {
        super(crawlPath, autoParse);
        /*start page*/
        this.addSeed("http://tieba.baidu.com/");

        /*fetch url like http://news.yahoo.com/xxxxx*/
        this.addRegex("http://tieba.baidu.com/p/\\d+");
        this.addRegex("-.*\\.(jpg|png|gif).*");
        /*do not fetch url contains #*/
        this.addRegex("-.*#.*");
    }

    @Override
    public void visit(Page page, Links nextLinks) {
        String url = page.getUrl();
        /*if page is news page*/
        if (Pattern.matches("http://tieba.baidu.com/p/\\d+", url)) {
           
            Document doc = page.getDoc();

            /*extract title and content of news by css selector*/
            Elements contents = doc.select(".d_post_content");
            Elements title = doc.select("#j_core_title_wrap > h3");
            
            
            Tieba tb = new Tieba();
            tb.setContent(contents.html());
            tb.setTitle(title.html());
            
            tb.save();
            
            

            /*If you want to add urls to crawl,add them to nextLinks*/
            /*WebCollector automatically filters links that have been fetched before*/
            /*If autoParse is true and the link you add to nextLinks does not match the regex rules,the link will also been filtered.*/
            // nextLinks.add("http://xxxxxx.com");
        }
    }

    public static void main(String[] args) throws Exception {
        TiebaCrawler crawler = new TiebaCrawler("crawl", true);
        crawler.setThreads(1);
        crawler.setTopN(100);
        //crawler.setResumable(true);
        /*start crawl with depth of 4*/
        crawler.start(4);
    }

}
