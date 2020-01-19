package ajax.crawler;

import cn.edu.hfut.dmic.webcollector.crawler.BreadthCrawler;
import cn.edu.hfut.dmic.webcollector.model.Links;
import cn.edu.hfut.dmic.webcollector.model.Page;

import java.io.IOException;
import java.util.regex.Pattern;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
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
        
        String huifu = page.getDoc().select("#thread_theme_5 > div.l_thread_info > ul > li:nth-child(2) > span:nth-child(1)").text();
        int huifu2;
        try {
        	huifu2 = Integer.parseInt(huifu);
        }catch(Exception e) {
        	huifu2 = 0;
        }
        
        if (huifu2 < 200) {
        	return;
        }
      
        /*if page is news page*/
        if (Pattern.matches("http://tieba.baidu.com/p/\\d+", url)) {
           
            Document doc;
			try {
				String trueUrl = url + "?see_lz=1";
				doc = Jsoup.connect(trueUrl).get();
				
				 /*extract title and content of news by css selector*/
	            Elements contents = doc.select(".d_post_content");
	            Elements title = doc.select("#j_core_title_wrap > h3");
	            Elements username = doc.select("#j_p_postlist > div:nth-child(1) > div.d_author > ul > li.d_name > a");
	            
	            Tieba tb = new Tieba();
	            StringBuilder content = new StringBuilder();
	            for (Element ele : contents) {
	            	content.append(ele.html());
	            	content.append("<br>");
	            }
	            tb.setContent(content.toString());
	            tb.setTitle(title.html());
	            tb.setLikes(huifu2);
	            tb.setUsername(username.text());
	            tb.setUrl(trueUrl);
	            
	            tb.save();
	            
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
        }
    }

    public static void main(String[] args) throws Exception {
        TiebaCrawler crawler = new TiebaCrawler("crawl", true);
        crawler.setThreads(50);
        crawler.setTopN(10000);
        //crawler.setResumable(true);
        /*start crawl with depth of 4*/
        crawler.start(20);
    }

}
