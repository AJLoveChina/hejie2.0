<?php
require_once(dirname(__FILE__).'/c.php');
class Page{
    protected $dbc, $arr, $error = false,
        $url, $xml, $header, $content, $footer,
        $query_url;
    function __construct( $arr ){
        C::setTimezone();
        $this->arr = $arr;
        //$pageXML = (C::isLocal())?C::getOutsidePath().'aj-db/aj_hfut_page.xml':C::getOutsidePath().'cgi-bin/aj_hfut_page.xml';
        $pageXML = (C::isLocal())?'config/aj_hfut_page.xml':'config/aj_hfut_page.xml';
        $this->xml = simplexml_load_file($pageXML);
        $this->header = $this->xml->header;
        $this->content = $this->xml->content;
        $this->footer = $this->xml->footer;
        $this->dbc = C::connect();
        $this->url = C::isLocal() ? $this->xml->config->url['local'] : $this->xml->config->url['server'];
        $this->query_url = $this->url.$this->xml->config->url['query'];
        if( !$this->isValidRoute() ){
            $this->error = true;
        }
        //添加到$This->arr中
        $this->arr['root_dir'] = $this->url;
        $this->arr['dbc'] = $this->dbc;
        $this->arr['xml'] = $this->xml;
        $this->arr['query_url'] = $this->query_url;
    }
    public function getHead(){
        $xml = $this->xml;
        $header = $this->header;
        $content = $this->content;
        $footer = $this->footer;
        $arr = $this->arr;
        $user = new User( $this->arr );

        $pageTitle = $xml->header->nav->li[0]['title'];
        forEach( $xml->header->nav->li as $li ){	//获取标题
            if( strtolower($li['kind']) == $arr['kind1'] ){
                $pageTitle = $li['title'];
            }
        }
        $back = '';
        $back .= "
			<!DOCTYPE html>
			<html>
			<head>
				<title>{$pageTitle}</title>
				<meta charset='UTF-8' />
				<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>
				<link rel='shortcut icon' href='img/aj/study.ico' />
				<link rel='stylesheet' type='text/css' href='css/c.css' />
				<link rel='stylesheet' type='text/css' href='css/xy.css' />
				<link rel='stylesheet' type='text/css' href='css/aj.css' />
			</head>
			<body>
		";
        $back .= "
			<div id='aj-header'>
				<div class='aj-header-bg'>
					<div class='aj-nav'></div>
					<div class='aj-nav-ul'>
						<ul>
		";
        forEach($header->nav->li as $li){
            $back.= "
						<li class='aj-li aj-bg-tran'>
							<a href='{$arr['url']}?r=1&kind1={$li['kind']}' class='aj-title'>{$li['title']}</a>

					";
            if(count($li->span)>0){
                $back.= "<div class='aj-lis-div'>";
                foreach($li->span as $span){
                    $back.= "
								<span class='aj-span'><a href='{$arr['url']}?r=1&kind1={$li['kind']}&kind2={$span['kind']}'>{$span['title']}</a></span>
							";
                }
                $back.= "</div>";
            }
            $back.="
						</li>
					";
        }
        if( $user->islogin() ){
            $user_name = ( isset($_SESSION['user']['user_nick']) AND ($_SESSION['user']['user_nick'] === '') ) ? $_SESSION['user']['user_schid'] : $_SESSION['user']['user_nick'];
            $userImgUrl = $user->wrapUserImgUrl( $_SESSION['user']['user_img'] );
            $user_id = $_SESSION['user']['user_id'];
            $daohang = new Daohang( $this->arr );
            $userCenterUrl = $daohang->wrapUrl2( array(
                'kind1'=>'a9',
                'r'=>'1',
                'user_center_id' => $_SESSION['user']['user_id']
            ) );
            $back .= "
							<li id='aj-user-nav-li' user-id='{$user_id}' class='aj-li aj-bg-tran' style='float:right;height:40px;'>
								<!-- <a class='aj-title c-ellipsis' style='border-right:none;font-size:14px;'>{$user_name}</a> -->
								<a href='{$userCenterUrl}' class='aj-title c-ellipsis' style='border-right:none;font-size:14px;' title='{$user_name}'>
									<img class='aj-user-img' src='{$userImgUrl}' />
								</a>
								<div class='aj-lis-div'>
									<span class='aj-span'><a href='{$userCenterUrl}'>个人中心</a></span>
									<span class='aj-span'><a class='aj-logout'>退出登录</a></span>
								</div>
							</li>
			";
        }else{
            $back .= "
							<li class='aj-li aj-bg-tran aj-sign-up-in-btn' style='float:right;'>
								<a class='aj-title' style='border-right:none;'>注册/登陆</a>
							</li>
			";
        }
        $back .="
							<div class='aj-clear'></div>
						</ul>
					</div>
				</div>
			</div>
		";
        return $back;
    }
    public function getFoot(){
        $xml = $this->xml;
        $header = $this->header;
        $content = $this->content;
        $footer = $this->footer;
        $ue_href = $this->arr['root_dir'].$this->arr['xml']->config->url['ue_href'];
        $back ='';

        $user = new User( $this->arr );
        $back .= $user->getSignPage();

        $back .= "
			<div id='aj-footer'>
				<div class='aj-footer'>
					<div class='aj-footer-top'>
						<div class='aj-footer-top-inside'>
							<div class='aj-outside-link'>
								<div class='aj-title'>友情链接<span class='aj-plus'>+</span></div>
								<div class='aj-links-wrap'>
									<div class='aj-link'><a href=\"http://jqxy.hfut.edu.cn\" target=\"_blank\" title=''>机械与汽车工程学院</a></div>
									<div class='aj-link'><a href=\"http://ea.hfut.edu.cn/\" target=\"_blank\" title=''>电气与自动化工程学院</a></div>
									<div class='aj-link'><a href=\"http://mse.hfut.edu.cn\" target=\"_blank\" title=''>材料科学与工程学院</a></div>
									<div class='aj-link'><a href=\"http://ci.hfut.edu.cn/\" target=\"_blank\" title=''>计算机与信息学院</a></div>
									<div class='aj-link'><a href=\"http://civil.hfut.edu.cn/\" target=\"_blank\" title=''>土木与水利工程学院</a></div>
									<div class='aj-link'><a href=\"http://civil.hfut.edu.cn/\" target=\"_blank\" title=''>土木与水利工程学院</a></div>
								</div>
							</div>
							<div class='aj-contact-us'>
								<table>
								<div class='title'>联系我们<span class='plus'>+</span></div>
								<div class='line'>
									<tr class='tr'>
										<td>Email</td>
										<td>735267452@qq.com</td>
									</tr>
								</div>
								<div class='line'>
									<tr class='tr'>
										<td>Phone</td>
										<td>(+86)18075076612</td>
									</tr>
								</div>
								</table>
							</div>
							<div class='clear'></div>
						</div>
					</div>
					<div class='aj-footer-bottom'>
						<div class='aj-footer-bottom-inside'>
							<div class='aj-center' style='margin-bottom:3px;'>
								<div class='aj-one'><a href=''>用户须知</a></div>
								<div class='aj-one'><a href=''>学术交流</a></div>
								<div class='aj-one'><a href=''>关于我们</a></div>
								<div class='aj-one'><a href=''>联系我们</a></div>
								<div class='aj-one'><a href=''>其他服务</a></div>
							</div>
							<div class='aj-center'>Copyright &copy;合肥工业大学土木与水利学院</div>
						</div>
					</div>
				</div>
				<form class='config-form' style='display:none;opacity:0;filter:alpha(opacity=0);'>
					<input type='hidden' name='kind1' value='{$this->arr['kind1']}' />
					<input type='hidden' name='kind2' value='{$this->arr['kind2']}' />
					<input type='hidden' name='url' value='{$this->url}' />
					<input type='hidden' name='index-url' value='{$this->arr['url']}' />
					<input type='hidden' name='page-token' value='{$this->arr['page_token']}' />
					<input type='hidden' name='form-token' value='{$this->arr['form_token']}' />
					<input type='hidden' name='query-url' value='{$this->query_url}' />
					<input type='hidden' name='ue-href' value='{$ue_href}' />
				</form>
			</div>
		";
        $back .= $this->getScripts();
        $back .="
			</body>
			</html>
		";
        return $back;
    }
    protected function getScripts(){
        $js = $this->xml->footer->js;
        $back = '';
        $back .= "<div class='aj-js-file'>";
        foreach( $js->one as $one ){
            if( strtolower(substr( $one['src'], 0, 4 )) === 'http' ){
                $back .= "<script src='{$one['src']}'></script>";
            }else{
                $back .= "<script src='{$this->url}{$one['src']}'></script>";
            }
        }
        $back .= "</div>";
        return $back;
    }
    public function getBody(){
        $xml = $this->xml;
        $header = $this->header;
        $content = $this->content;
        $footer = $this->footer;

        if( $this->error ){		//是否需要跳转到错误页面
            $back = $this->getErrorPageContent();
            return $back;
        }

        $xml = $this->xml;
        $back = '';
        $back .= "
			<div id='aj-content'>
		";
        $back.= "<div class='aj-content-one'>";

        $functionName = 'get'.strtoupper( substr($this->arr['kind1'],0,1) ).substr($this->arr['kind1'],1,1);
        $back .= $this->{$functionName}(); 	//根据路由获取内容

        $back .= "</div>";

        $back .= "
			</div>
		";
        return $back;
    }
    public function dealWithQuery(){
        C::setTimezone();

        $query = new Query( $this->arr );
        if( $query->isQueryValid() ){
            if( $_SERVER['REQUEST_METHOD'] === "POST" ){
                $query->dealWithPost();
            }else{
                $query->dealWithGet();
            }
        }
    }
    public function getA1(){//首页
        $back = '';
        $back .= $this->getImgsRoll();

        /* 		$arr = array();
                $arr['nav'] = $this->xml->header->nav;
                $arr['dbc'] = $this->dbc;
                $arr['arr'] = $this->arr; */
        $news = new News( $this->arr );
        $span = $this->xml->header->nav->li[1]->span[0];
        $back .= $news->getNews( $span['news-type'], $span['title'], 1, 6, array('kind'=>$span['kind'],'page_type'=>'index') );

        return $back;
    }
    public function getA2(){//新闻
        $back = '';
        /* 		$arr = array();
                $arr['nav'] = $this->xml->header->nav;
                $arr['dbc'] = $this->dbc;
                $arr['arr'] = $this->arr; */

        $news = new News( $this->arr );
        $back .= $news->getAllTypesNews();
        return $back;
    }
    public function getA3(){//通知公告
        $back = '';
        $back .= $this->getTongzhi();
        return $back;
    }
    public function getA4(){//就业考研
        $back = '';
        $back .= $this->getWorkStudy();
        return $back;
    }
    public function getA5(){//政策文件下载
        $back = '';
        $back .= $this->getZhence();
        return $back;
    }
    public function getA6(){//心理健康
        $back = '';
        $back .= $this->getHealth();
        return $back;
    }
    public function getA7(){	//学子风采
        $back = '';
        $back .= $this->getStudentsWonder();
        return $back;
    }
    public function getA8(){ 	//学术交流
        $back = '';
        $back .= $this->getXueshu();
        return $back;
    }
    public function getA9(){	//user center
        $back = '';
        $user = new User( $this->arr );
        if( $this->arr['user_center_id'] === 0 ){
            if( $user->isLogin() ){
                $user_id = $_SESSION['user']['user_id'];
            }
        }else{
            $user_id = $this->arr['user_center_id'];
        }
        $back .= $user->getUserCenter( $user_id );

        return $back;
    }
    public function getAa(){
        $back = '';
        $id = $this->arr['news_id'];
        $news = new News( $this->arr );
        $back .= $news->getNewsById( $id );
        return $back;
    }
    public function getAb(){
        $back = '';
        $id = $this->arr['xueshu_id'];
        $xueshu = new Xueshu( $this->arr );
        $back .= $xueshu->getPageByXueshuId( $id );
        return $back;
    }
    public function getXueshu(){
        $back = '';
        $xs = new Xueshu( $this->arr );
        $back .= $xs->getXueshu();
        return $back;
    }
    public function isValidRoute(){
        $xml = $this->xml;
        $kind1 = $this->arr['kind1'];
        $kind2 = $this->arr['kind2'];
        $bool = false;
        /* 		forEach( $xml->header->nav->li as $li ){
                    if( strtolower($li['kind']) == $kind1 ){
                        forEach( $li->span as $span ){
                            if( strtolower($span['kind']) == $kind2 ){
                                $bool = true;
                                break 2;
                            }
                        }
                    }
                } */
        if( strlen($kind1) === 2 AND strlen($kind2) === 2 ){
            $bool = true;
        }
        return $bool;
    }
    public function getErrorPageContent(){
        $back = '';
        $back .= "
			<div id='aj-content'>
				<div class='aj-content-one'>
					<h2>Error 404 Not Found!...</h2>
				</div>
			</div>
		";
        return $back;
    }
    public function getImgsRoll(){
        $xml = $this->xml;
        $content = $this->xml->content;
        $back = '';
        $back .= "
			<div class='aj-index'>
				<div class='aj-img-roll'>
		";
        foreach($content->indeximgroll->img as $img){
            $back.= (isset($img['delay']) AND strtolower($img['delay'])==='1')?
                "<img class='img' aj-delay-src='{$img['src']}' src=''/>":
                "<img class='img' src='{$img['src']}'/>";
        }
        $back.="
				</div>
			</div>
		";
        return $back;
    }
    public function getStudentsWonder(){
        $kindArr = array();
        $back = '';
        foreach ( $this->xml->header->nav->li as $li ){
            if( strtolower($li['kind']) === 'a7' ){
                foreach( $li->span as $span ){
                    $kindArr[] = array(
                        'kind' => $span['kind'],
                        'title' => $span['title']
                    );
                }
                break;
            }
        }
        foreach( $kindArr as $arr ){
            switch( strtolower($arr['kind']) ){
                case 'b1':
                    $back .= "<h1>{$arr['title']}</h1>";
                    $user = new User( $this->arr );
                    $back .= $user->getUsersRoll();
                    break;
                case 'b2':
                    $this->arr['honorwall'] = array();
                    $this->arr['honorwall']['title'] = $arr['title'];
                    $news = new News( $this->arr );
                    $back .= $news->getHonorWall();
                    break;
            }
        }
        return $back;
    }
    public function getWorkStudy(){
        $back = '';
        $ws = new WorkStudy( $this->arr );
        $back .= $ws->getPage();
        return $back;
    }
    public function getZhence(){
        $back = '';
        $news = new News( $this->arr );
        $back .= $news->getZhence();
        return $back;
    }
    public function getHealth(){
        $back = '';
        $health = new Health( $this->arr );
        $back .= $health->getPage();
        return $back;
    }
    public function getTongzhi(){
        $back = '';
        $tz = new News( $this->arr );
        $back .= $tz->getTongzhi();
        return $back;
    }
}

class Error{
    protected $info;
    function __construct($info){
        $this->info = $info;
    }
    public function getInfo(){
        return $this->info;
    }
    public function dealWith(){
        //echo $this->info;
        $val = $this->info.'-'.date( 'Y-m-d,H:i:s', time() );
        file_put_contents( dirname(__FILE__).'/error.txt', $val.PHP_EOL, LOCK_EX|FILE_APPEND );
    }
}

class News{
    protected $nav, $dbc, $arr, $table, $honor_table;
    function __construct( $arr ){
        $this->nav = $arr['xml']->header->nav;
        $this->dbc = $arr['dbc'];
        $this->arr = $arr;
        $this->table = "aj_tumu_news";
        $this->honor_table = "aj_tumu_honor";
    }
    public function getAllTypesNews(){
        $nav = $this->nav;
        $back = '';
        //$nav = $this->xml->header->nav;
        foreach( $nav->li as $li ){
            if( strtolower($li['type']) == 'news'){
                $news_limit = (int)$li['news_limit'];
                $news_page = isset($this->arr['news_page']) ? $this->arr['news_page'] : 1;
                //news_page の格式形如 b1_3(表示b1类第三页)
                //默认所有类型的news都是第一页
                $news_page_arr = explode( '_' , $news_page );	//b1_1 => ['b1','1']

                foreach( $li->span as $span ){
                    $page = 1;
                    if( strtolower($span['kind']) === strtolower($news_page_arr[0]) ){
                        $page = (int) $news_page_arr[1];
                        $page = ($page>=1) ? $page : 1;
                    }
                    $arr = array();
                    $arr['kind'] = $span['kind'];
                    $back .= $this->getNews( $span['news-type'], $span['title'], $page, $news_limit, $arr );
                }
                break;
            }
        }
        return $back;
    }
    public function getNews( $news_type, $title, $page, $limit, $arr , $method = 'wrapNews'){
        $back = '';
        $is_delete = 0;
        $page = (isset($page)) ? $page : 1;
        $limit = (isset($limit)) ? $limit : 9 ;
        // $news_type = 1;
        $query = sprintf("SELECT news_id,news_title,news_url,news_cover,news_desc,news_val,UNIX_TIMESTAMP(date_entered) AS date
							FROM %s WHERE is_delete = %d AND news_type = %d ORDER BY date_entered DESC
							LIMIT %d,%d ", $this->table, $is_delete, $news_type, ($page-1)*$limit, $limit );

        /* 		$queryNum = sprintf("SELECT count(news_id) AS num FROM tumu_news WHERE is_delete = 0");
                $queryNumResult = C::query( $queryNum, $this->dbc );
                if( $queryNumResult ){
                    $queryNumRows = mysql_fetch_array($queryNumResult);
                    $totalNum = $queryNumRows['num'];
                }else{
                    $error = new Error(mysql_error($this->dbc));
                    echo $error->getInfo();
                    exit();
                } */
        $totalNum = $this->getTotalNumOfNewsByNewsType( $news_type );
        $result = C::query($query,$this->dbc);
        if( !$result ){
            $error = new Error(mysql_error($this->dbc));
            echo $error->getInfo();
        }
        $totalpages = ceil($totalNum/$limit);		//all pages quantity
        $daohang = array();
        $daohang['page'] = $page;
        $daohang['pages'] = $totalpages;
        $daohang['kind'] = $arr['kind'];

        $thisQueryNum = mysql_num_rows($result);
        if( $thisQueryNum >0 ){
            $page_num_display_style = '';
            if( isset($arr['page_type']) AND $arr['page_type'] !== 'news' ){
                $page_num_display_style = 'display:none;';
            }
            switch( $method ){
                case "wrapNews2":
                    $back .= "
						<div class='aj-news-work-study-wrap'>
							<div id='xy_jobTwo_block1'>
								<table>
									<tr class='xy_div1_tr'>
										<td class='xy_div1_tr_td1'>{$title}</td>
										<td class='xy_div1_tr_td2'></td>
									</tr>
								</table>
							</div>
							<div id='xy_jobTwo_block2'>
								<table>
					";
                    break;
                case "wrapNews":
                default:
                    $back .= "
						<div id='xy_focusNews'>
							<p class='aj-add-margin-bottom'>{$title}<span style='font-size:13px;margin-left:10px;{$page_num_display_style}'>Page:{$page}/{$totalpages}</span></p>
					";
                    break;
            }
            $id_index = 1;		//	news paixu id
            while( $rows = mysql_fetch_array($result) ){
                $rows['id_index'] = $id_index;
                $back .= $this->{$method}( $rows );
                $id_index++;
            }
            switch( $method ){
                case "wrapNews2":
                    $back .= "
							</table>
						</div>
					";
                    break;
                case "wrapNews":
                default:
                    $back .= "<p class='aj-clear'></p>";
                    break;
            }
            if( !isset($arr['page_type']) OR $arr['page_type'] !== 'index' ){
                $back .= $this->getDaoHangForNews( $this->arr, $daohang );
            }
            switch( $method ){
                case "wrapNews2":
                    $back .= "
						</div>
					";
                    break;
                case "wrapNews":
                default:
                    $back .= "</div>";
                    break;
            }
        }else{	//no more news
            $back .= "No more news ~";
        }
        return $back;
    }
    public function getTotalNumOfNewsByNewsType( $news_type = 1 ){
        $table = $this->arr['xml']->news['table'];
        $queryNum = sprintf("SELECT count(news_id) AS num FROM %s WHERE is_delete = 0 AND
					news_type = %d ", $table, $news_type );
        $queryNumResult = C::query( $queryNum, $this->dbc );
        if( $queryNumResult ){
            $queryNumRows = mysql_fetch_array($queryNumResult);
            return $queryNumRows['num'];
        }else{
            $error = new Error( mysql_error($this->dbc).__LINE__ );
            $error->dealWith();
        }
    }
    protected function getDaoHangForNews( $arr1, $arr2 ){
        $back='';
        $indexUrl = $arr1['url'];
        $indexUrl .="?";
        $indexUrl .= "r=".$arr1['r']."&";
        $indexUrl .= "kind1=".$arr1['kind1']."&";
        $indexUrl .= "kind2=".$arr1['kind2']."&";
        $index = $arr2['pages'] > 10 ? 10 : $arr2['pages'];

        $result = $indexUrl."news_page=".$arr2['kind']."_1";
        $back .= "
			<span class='aj-news-daohang'>
			<a class='aj-a-btn' href='{$result}'>首页</a>
		";
        for( $i=1; $i <= $index; $i++ ){

            if( $i === (int)$arr2['page'] ){
                $back .= "<a class='aj-a-btn aj-select' href='javascript:void(0)'>{$i}</a>";
            }else{
                $result = $indexUrl."news_page=".$arr2['kind']."_".$i;
                $back .= "<a class='aj-a-btn' href='{$result}'>{$i}</a>";
            }
        }
        $result = $indexUrl."news_page=".$arr2['kind']."_".$index;
        $back .= "
			<a class='aj-a-btn' href='{$result}'>尾页</a>
			</span>
		";
        return $back;
    }
    public function wrapNews($arr){
        $haveImg = ($arr['news_cover'] === '0') ? false : true;
        //PHP 比较不同于JS 'zifuchuan' == 0 return true!(首先不同类型进行类型转换)
        $back = '';
        $news_id = $arr['news_id'];
        $url = $this->arr['index_url']."?kind1=aa&news_id=".$news_id;
        if( $haveImg ){		//有图片
            $back .= "
				<div id='xy_FNdiv{$arr['id_index']}'>
					<hr/>
					<p><img src='{$arr['news_cover']}' id='xy_FNdiv{$arr['news_id']}img1'/></p>
					<p id='xy_FNdiv4p2'><a href='{$url}'>{$arr['news_title']}</a></p>
					<p id='xy_FNdiv4p3'><a href='{$url}'>{$arr['news_desc']}</a></p>
				</div>
			";
        }else{				//木有图片
            $back .= "
				<div id='xy_FNdiv{$arr['id_index']}'>
					<hr/>
					<p><img src='' id='xy_FNdiv{$arr['news_id']}img1'/></p>
					<p id='xy_FNdiv5p2'><a href='{$url}'>{$arr['news_title']}</a></p>
					<p id='xy_FNdiv5p3'><a href='{$url}'>{$arr['news_desc']}</a></p>
				</div>
			";
        }
        return $back;
    }
    public function wrapNews2( $arr ){
        $back = '';
        $time = C::dateShow( $arr['date'], time() );
        $url = $this->arr['index_url']."?kind1=aa&news_id=".$arr['news_id'];
        $back .= "
			<tr class='xy_jobTwo_div2_tr'>
				<td class='xy_div2_tr_td1'><li><a href='{$url}'>{$arr['news_title']}</a></li></td>
				<td class='xy_div2_tr_td2'>[{$time}]</td>
			</tr>
		";
        return $back;
    }
    public function getNewsById( $id ){
        $back = '';
        $query = sprintf("SELECT news_id,news_title,news_url,news_cover,news_desc,news_val,date_entered
							FROM %s WHERE news_id = %d LIMIT 1", $this->table, $id );
        $result = C::query( $query, $this->dbc );
        if( $result AND mysql_num_rows($result) === 1 ){
            $rows = mysql_fetch_array( $result );
            $back .= "
				<div class='aj-news-one-show'>
					<p class='aj-p'>{$rows['news_title']}</p>
					<p class='aj-p'>日期：{$rows['date_entered']}</p>
					<p class='aj-desc'>{$rows['news_desc']}</p>
					<div class='aj-content'>{$rows['news_val']}</div>
				</div>
			";
        }else{
            $back .= "<h2>NOT Found!</h2>";
        }
        return $back;
    }
    public function getHonorWall(){
        $back = '';
        $configData = $this->arr['honorwall'];
        $kind = 'honor_page';
        $page = (int) $this->arr[$kind];
        $onepage_num = 10;
        $totalNum = $this->getHonorTotalNum();
        $totalPages = ceil( $totalNum / $onepage_num );
//		$table = $this->arr['xml']->honor->wall['table'];
        $table = $this->honor_table;
        $dir = $this->arr['xml']->honor->wall['dir'];

        $query = sprintf( "SELECT honor_id,honor_title,honor_desc,honor_img1,honor_img2,honor_img3,UNIX_TIMESTAMP(date_entered) AS time
					FROM %s WHERE is_delete = 0 ORDER BY date_entered DESC LIMIT %d,%d", $table, ($page-1)*$onepage_num, $onepage_num );
        $result = C::query( $query, $this->arr['dbc'] );

        if( $result ){

            if( mysql_num_rows($result) > 0 ){

                $back .= "<h1 class='aj-block-title' id='tumu_honor'>{$configData['title']}<span style='font-size:12px;margin-left:20px;'>Pages:{$page}/{$totalPages}</span></h1>";
                while( $rows = mysql_fetch_array($result) ){
                    $rows['wall_config'] = array(
                        'root_dir' => $this->arr['root_dir'],
                        'dir' => $dir
                    );
                    $back .= $this->wrapHonorWall( $rows );
                }
                $back .= $this->getDaoHangForHonor( $kind, $page, $totalPages );
            }
        }else{
            $error = new Error( mysql_error($this->arr['dbc']) );
            $error->dealWith();
        }
        return $back;
    }
    public function getHonorTotalNum(){
        $query = sprintf( "SELECT count(honor_id) AS num FROM %s WHERE is_delete =0 ",  $this->honor_table );
        $result = C::query( $query, $this->dbc );
        $arr = mysql_fetch_array( $result );
        return $arr['num'];
    }
    public function wrapHonorWall( $rows ){
        $back = '';
        $back .= "
			<div style='width:730px;'>
				<div class='aj-honor-wall'>
					<h2>{$rows['honor_title']}</h2>
					<p class='aj-desc'>{$rows['honor_desc']}</p>
					<div class='aj-imgs-wrap'>
		";
        for( $i = 1; $i <= 3; $i++ ){
            $name = $rows['honor_img'.$i];
            if(  $name !== '0' AND trim($name) !== ''){
                $back .= "<img src='{$rows['wall_config']['root_dir']}{$rows['wall_config']['dir']}{$name}' />";
            }
        }
        $back .="
					</div>
					<div class='aj-bottom'>
						<span class='aj-one'>1天前 12:30</span>
					</div>
				</div>
			</div>
		";
        return $back;
    }
    public function getDaoHangForHonor( $kind, $page, $totalPages ){
        $back = '';
        $this->arr['daohang'] = array();
        $this->arr['daohang']['kind'] = $kind;
        $this->arr['daohang']['page'] = $page;
        $this->arr['daohang']['totalPages'] = $totalPages;
        $this->arr['daohang']['location'] = '#tumu_honor';
        $dh = new Daohang( $this->arr );
        $back = $dh->getDaoHang();
        return $back;
    }
    public function getZhence(){
        $back = '';
        $back .= "
			<div id='xy_download_body'>
				<div class='xy_download_block2'>
					<div class='xy_download_block2_div1'>文件上传</div>
					<hr class='xy_download_block2_div1_hr'/>
					<div class='xy_download_block2_div2'>
						<h2 class ='xy_download_block2_div2_h2'>文件下载</h2>
						<ul>
		";
        $back .= $this->getZhenceWenjian();

        $back .="		</ul>
					</div>
				</div>
			</div>
		";
        return $back;
    }
    public function getZhenceWenjian(){
        $back = '';
        $table = strtolower($this->arr['xml']->news->zhence['table']);
        $page = (int)$this->arr['wenjian_page'];
        $page_num = 10;
        $totalNum = $this->getTotalNumOfWenjian();
        $totalPages = ceil( $totalNum / $page_num );
        $query = sprintf("SELECT upload_id,u_title,u_desc,u_href,u_title,UNIX_TIMESTAMP(date_entered) AS time
					FROM %s WHERE is_delete = 0 ORDER BY date_entered DESC LIMIT %d,%d", $table, ($page-1)*$page_num, $page_num );
        $result = C::query( $query, $this->arr['dbc'] );
        if( $result ){
            if( mysql_num_rows($result)>0 ){
                while( $rows = mysql_fetch_array($result) ){
                    $back .= $this->wrapZhenceWenjian( $rows );
                }
                $back .= $this->getDaoHangForWenjian( $page, $totalPages );
            }
        }else{
            $error = new Error( mysql_error($this->arr['dbc']) );
            $error->dealWith();
        }
        return $back;
    }
    public function getTotalNumOfWenjian(){
        $table = strtolower($this->arr['xml']->news->zhence['table']);
        $query = sprintf( "SELECT count(upload_id) AS num FROM %s WHERE is_delete =0 " ,$table );
        $result = C::query( $query, $this->arr['dbc'] );
        if( $result ){
            $arr = mysql_fetch_array($result);
            return $arr['num'];
        }else{
            $error = new Error( mysql_error($this->arr['dbc']).__LINE__ );
            $error->dealWith();
        }
    }
    public function wrapZhenceWenjian( $rows ){
        $back = '';
        $root = $this->arr['root_dir'];
        $dir = $this->arr['xml']->news->zhence['dir'];
        $date = C::dateShow( $rows['time'], time() );
        $back .= "
			<li class='xy_download_block2_div2_li'>
				<p class='xy_download_block2_div2_li_p1'>{$rows['u_title']}</p>
				<hr class='xy_download_block2_div2_li_p1_hr'/>
				<p class='xy_wenjian_desc'>{$rows['u_desc']}</p>
				<p class='xy_download_block2_div2_li_p2'> <a href='{$root}{$dir}{$rows['u_href']}'>点击下载</a> 上传日期&nbsp;{$date} 下载次数:15</p>
			</li>
		";
        return $back;
    }
    public function getDaoHangForWenjian( $page, $totalPages ){
        $back = '';
        $this->arr['daohang'] = array();
        $this->arr['daohang']['kind'] = 'wenjian_page';
        $this->arr['daohang']['page'] = $page;
        $this->arr['daohang']['totalPages'] = $totalPages;
        $daohang = new Daohang( $this->arr );
        $back .= $daohang->getDaoHang2();
        return $back;
    }
    public function getTongzhi(){
        $back = '';
        $root_dir = $this->arr['root_dir'];
        $back .= "
			<div id='xy_tongzhigonggao_body'>
				<div  class='xy_tongzhigonggao_block0'>
					<img src='{$root_dir}img/aj/tongzhi.jpg' class='xy_tongzhigonggao_block0_img'/>
				</div>
				<div class='xy_tongzhigonggao_block1'>
					<p class='xy_tongzhigonggao_block1_p'>教务动态</p>
					<hr class='xy_tongzhigonggao_block1_hr'/>
					<div  class='xy_tongzhigonggao_block1_div1'>
						<div class='xy_tongzhigonggao_block1_div1_div'>
							<ul>
		";
        $news_type = 3;
        $back .= $this->getNewsOfTypeMoreThanOne( $news_type );
        $back .= "
							</ul>
						</div>
					</div>
				</div>
				<div class='xy_tongzhigonggao_block2'>
					<div class='xy_tongzhigonggao_block2_div1'>
						<p class='xy_tongzhigonggao_block2_div_p'>论坛讲座</p>
						<hr class='xy_tongzhigonggao_block2_div_hr'/>
						<div>
							<ul>
		";
        $news_type = 2;
        $back .= $this->getNewsOfTypeMoreThanOne( $news_type );

        $back .="
							</ul>
						</div>
					</div>
					<!--
					<div  class='xy_tongzhigonggao_block2_div2'>
						<p class='xy_tongzhigonggao_block2_div_p'>点击排行榜</p>
						<hr class='xy_tongzhigonggao_block2_div_hr'/>
						<div>
							<ul>
								<li class='xy_tongzhigonggao_block2_li'>关于2015年（下）全国计算机等级考试报名的通知</li>
								<li class='xy_tongzhigonggao_block2_li'>2015年合肥校区“小学期”及暑假食堂停伙复伙时间安排通知</li>
								<li class='xy_tongzhigonggao_block2_li'>关于开展中央级普通高校改善基本办学条件专项资金16-18年度项...</li>
							</ul>
						</div>
					</div>
					-->
				</div>
				<div style='clear:both;'></div>
			</div>
		";

        return $back;
    }
    public function getNewsOfTypeMoreThanOne( $news_type ){
        $back = '';
        $kind = 'tongzhi_'.$news_type.'_page';
        $page = $this->arr[$kind];
        $page_num = $news_type === 2 ? 20 : 10;
        $totalNum = $this->getTotalNumOfNewsByNewsType( $news_type );
        $totalPages = ceil( $totalNum / $page_num );

        $table = $this->arr['xml']->news->tongzhi['table'];
        $query = sprintf( "SELECT news_id,news_title,news_url,UNIX_TIMESTAMP(date_entered) AS time
					FROM %s WHERE is_delete = 0 AND news_type = %d ORDER BY date_entered DESC
					LIMIT %d,%d", $table, $news_type, ($page-1)*$page_num, $page_num );
        $result = C::query( $query, $this->arr['dbc'] );


        if( $result ){
            while( $rows = mysql_fetch_array($result) ){
                $back .= $this->wrapNewsOfTypeMoreThanOne( $rows );
            }
            $this->arr['daohang'] = array();
            $this->arr['daohang']['kind'] = $kind;
            $this->arr['daohang']['page'] = $page;
            $this->arr['daohang']['totalPages'] = $totalPages;

            $daohang = new Daohang( $this->arr );
            $back .= $daohang->getDaoHang2();

        }else{
            $error = new Error( mysql_error($this->arr['dbc']).__LINE__ );
            $error->dealWith();
        }
        return $back;
    }
    public function wrapNewsOfTypeMoreThanOne( $rows ){
        $time = C::dateShow( $rows['time'], time() );
        $url = ($rows['news_url'] === '0' OR empty($rows['news_url'])) ? $this->arr['index_url'].'?kind1=aa&news_id='.$rows['news_id'] : $rows['news_url'];
        $back = "
			<li class ='xy_tongzhigonggao_block1_div1_div_li'>
				[{$time}]
				<a class ='xy_tongzhigonggao_block1_div1_div_a' href='{$url}'>
						{$rows['news_title']}
				</a>
			</li>
		";
        return $back;
    }

}

class User{
    protected $dbc, $url, $xml, $arr, $table;
    function __construct( $arr = null ){
        C::sessionStart();
        //$pageXML = (C::isLocal())?C::getOutsidePath().'aj-db/aj_hfut_page.xml':C::getOutsidePath().'cgi-bin/aj_hfut_page.xml';
        $pageXML = (C::isLocal())?'config/aj_hfut_page.xml':'config/aj_hfut_page.xml';
        $this->xml = simplexml_load_file($pageXML);
        $this->url = C::isLocal() ? $this->xml->config->url['local'] : $this->xml->config->url['server'];
        $this->dbc = C::connect();
        $this->arr = isset($arr) ? $arr : null;
        $this->table = "aj_tumu_users";
    }
    public function getSignPage(){
        $back = '';
        $sign_in_verify_url = $this->arr['query_url']."?r=query&way=1&kind=signin&page_token=".$_SESSION['token']['page'];
        $sign_up_verify_url = $this->arr['query_url']."?r=query&way=1&kind=signup&page_token=".$_SESSION['token']['page'];
        $sign_token = sha1(uniqid().rand(1000,9999));
        $_SESSION['token'] = (isset($_SESSION['token'])) ? $_SESSION['token'] : array();
        $_SESSION['token']['sign'] = $sign_token;
        $back .= "
			<div class='c-aj-sign-up-in-shadow'>
				<div id='aj-sign-up-in' class='c-aj-sign-up-in'>
					<div class='aj-sign-content'>
						<div class='aj-header'>
							<span class='aj-left'>登陆</span>
							<span class='aj-right'></span>
						</div>
						<div class='aj-sign-form'>
							<form class='aj-sign-in-form'>
								<div class='aj-form-input'>
									<div class='aj-name-zhishi aj-zhishi'>
										<img style='width:25px;height:25px;' aj-delay-src='img/aj/c/small-bg/sign-user.png' src=''>
									</div>
									<div class='aj-name-input'>
										<input type='text' name='aj-form-name' value='' placeholder='学号' />
									</div>
								</div>
								<div class='aj-form-input'>
									<div class='aj-pass-zhishi aj-zhishi'>
										<img style='width:25px;height:25px;' aj-delay-src='img/aj/c/small-bg/sign-pass.png' src=''>
									</div>
									<div class='aj-pass-input'>
										<input type='password' name='aj-form-pass' value='' placeholder='密码' />
									</div>
								</div>
								<div class='aj-form-input aj-check-wrap'>
									<div class='aj-check-input'>
										<input type='text' name='aj-form-verify-code' value='' placeholder='验证码' />
									</div>
									<div class='aj-check-zhishi'>
										<img class='aj-verify-img' title='点击刷新' src='{$sign_in_verify_url}' onclick=\"(function(obj){obj.setAttribute('src','{$sign_in_verify_url}&rand='+Math.random());})(this)\" alt='验证码'>
										<span><a>看不清换一张</a></span>
									</div>
								</div>
								<div class='aj-line'>
									<input type='checkbox' name='aj-form-remember-me' value=''/>
									<span class='aj-remember'>下次自动登录</span>
								</div>
								<div class='aj-info' style='display:none;font-size:12px;line-height:20px;height:20px;color:red;'></div>
								<input type='hidden' name='sign-token' value='{$sign_token}' />
								<div>
									<button class='aj-button aj-submit'>登录</button>
								</div>
							</form>
							<div class='aj-other-info'>
								<p class='aj-p1'><a class='c-aj-sign-up-btn c-hover'>新用户注册</a></p>
								<p class='aj-p2'><a class='c-aj-forget-pass c-hover'>忘记密码</a></p>
							</div>
							<div class='aj-fenge-line'>
								<div class='aj-line-one aj-left-line'></div>
								<div class='aj-mid-word'>请使用学号作为用户名</div>
								<div class='aj-line-one aj-right-line'></div>
							</div>
							<div class='aj-other-account' style='display:none;'>
								<a><img aj-delay-src='img/aj/c/small-bg/sina.png' src=''></a>
								<a><img aj-delay-src='img/aj/c/small-bg/renren.png' src=''></a>
							</div>
						</div>
					</div>
					<!--************************************************-->
					<div class='aj-sign-content' style='display:none;'>
						<div class='aj-header'>
							<span class='aj-left'>注册</span>
							<span class='aj-right'></span>
						</div>
						<div class='aj-sign-form'>
							<form class='aj-sign-up-form'>
								<div class='aj-form-input'>
									<div class='aj-name-zhishi aj-zhishi'>
										<img style='width:25px;height:25px;' aj-delay-src='img/aj/c/small-bg/sign-user.png' src=''>
									</div>
									<div class='aj-name-input'>
										<input type='text' name='aj-form-name' value='' placeholder='学号' />
									</div>
								</div>
								<div class='aj-form-input'>
									<div class='aj-pass-zhishi aj-zhishi'>
										<img style='width:25px;height:25px;' aj-delay-src='img/aj/c/small-bg/sign-pass.png' src=''>
									</div>
									<div class='aj-pass-input'>
										<input type='password' name='aj-form-pass' value='' placeholder='密码' />
									</div>
								</div>
								<div class='aj-form-input'>
									<div class='aj-pass-zhishi aj-zhishi'>
										<img style='width:25px;height:25px;' aj-delay-src='img/aj/c/small-bg/sign-pass.png' src=''>
									</div>
									<div class='aj-pass-input'>
										<input type='password' name='aj-form-pass-confirm' value='' placeholder='确认密码' />
									</div>
								</div>
								<div class='aj-form-input aj-check-wrap'>
									<div class='aj-check-input'>
										<input type='text' name='aj-form-verify-code' value='' placeholder='验证码' />
									</div>
									<div class='aj-check-zhishi'>
										<img class='aj-verify-img' title='点击刷新' src='{$sign_up_verify_url}' onclick=\"(function(obj){obj.setAttribute('src','{$sign_up_verify_url}&rand='+Math.random());})(this)\" alt='验证码'>
										<span><a>看不清换一张</a></span>
									</div>
								</div>
								<div class='aj-line'>
									<input type='checkbox' name='' value=''/>
									<span class='aj-remember'>下次自动登录</span>
								</div>
								<div class='aj-info' style='display:none;font-size:12px;line-height:20px;height:20px;color:red;'></div>
								<input type='hidden' name='sign-token' value='{$sign_token}' />
								<div>
									<button class='aj-button aj-submit'>注册</button>
								</div>
							</form>
							<div class='aj-other-info'>
								<p class='aj-p1'><a class='c-aj-sign-in-btn c-hover'>返回登录</a></p>
							</div>
						</div>
					</div>
					<div class='aj-close'>
						<div class='aj-close-inside'>
							<img class='img aj-close-img' aj-delay-src='img/aj/c/small-bg/close3.png' src=''/>
						</div>
					</div>
				</div>
			</div>
		";
        return $back;
    }
    public function signIn( $arr ){ 	//$arr['name'],$arr['pass']
        $name = C::safe( $arr['name'], $this->dbc );
        $pass = C::safe( $arr['pass'], $this->dbc );

        $bool = true;
        if( !$this->isSchidUsed($name) ){
            $bool = false;
            $arr = array(
                'isok' => '0',
                'code' => '4',
                'info' => 'user not exist' //用户名不存在
            );
        }

        $query = sprintf("SELECT user_id,user_img,user_schid,user_nick,user_pass,UNIX_TIMESTAMP(date_entered) AS time
				FROM %s WHERE is_delete = 0 AND user_schid = %s", $this->table, $name);
        $result = C::query( $query, $this->dbc );

        if( $bool ){
            $rows = mysql_fetch_array($result);
            if( $rows['user_pass'] === $arr['pass'] ){

                $this->saveSession( $rows );

                $rows_back = array();
                $rows_back['user_id'] = $rows['user_id'];
                $rows_back['user_schid'] = $rows['user_schid'];
                $rows_back['user_nick'] = $rows['user_nick'];
                $rows_back['user_img'] = $rows['user_img'];
                $arr = array(
                    'isok' => '1',
                    'data' => $rows_back,
                    'info' => ''
                );

            }else{	//pass not match
                $arr = array(
                    'isok' => '0',
                    'code' => '3',
                    'info' => 'pass not match'
                );
            }
        }
        return $arr;
    }
    public function signUp( $arr ){		//$arr['name'],$arr['pass']
        $name = C::safe( $arr['name'], $this->dbc );
        $pass = C::safe( $arr['pass'], $this->dbc );
        $nick = '';
        $bool = false;
        if( !$this->isSchidUsed($name) ){
            $bool = true;	//OK,执行开始！
        }else{
            $arr = array(
                'isok' => '0',
                'code' => '3',
                'info' => 'schid has been used'
            );
        }
        if( $bool ){
            $user_img = 'user.png';
            $query = sprintf("INSERT INTO %s (user_img,user_schid,user_nick,user_pass)
							VALUES('%s','%s','%s','%s')", $this->table, $user_img, $name, $nick, $pass );
            $result = C::query( $query, $this->dbc );
            if( $result ){
                $insert_id = mysql_insert_id( $this->dbc );
                $arr = array(
                    'isok' => '1',
                    'info' => '',
                    'id' => $insert_id
                );
                $this->mkUserDir( $insert_id );
                $user_info_arr = array(
                    'user_id' => $insert_id,
                    'user_nick' => $nick,
                    'user_schid' => $name,
                    'user_pass' => $pass,
                    'user_img' => $user_img
                );
                $this->saveSession( $user_info_arr );
            }else{
                $arr = array(
                    'isok' => '0',
                    'info' => mysql_error( $this->dbc )
                );
            }
        }
        return $arr;
    }
    public function saveSession( $arr ){
        isset($_SESSION['user']) OR $_SESSION['user'] = array();
        $_SESSION['user']['islogin'] = '1';
        $_SESSION['user']['type'] = 'user';
        $_SESSION['user']['user_id'] = $arr['user_id'];
        $_SESSION['user']['user_nick'] = $arr['user_nick'];
        $_SESSION['user']['user_schid'] = $arr['user_schid'];
        $_SESSION['user']['user_pass'] = $arr['user_pass'];
        $_SESSION['user']['user_img'] = $arr['user_img'];
    }
    public function isThisUser($user_id){ // return true OR　false
        $user_id = $user_id."";
        if (isset($_SESSION['user']['islogin']) AND $_SESSION['user']['islogin'] == '1') {
            if ($_SESSION['user']['user_id'] == $user_id) {
                return true;
            }
        }
        return false;
    }
    public function logout(){
        unset( $_SESSION['user'] );
    }
    public function islogin(){
        $bool = false;
        $bool = ( isset( $_SESSION['user'] ) AND ( $_SESSION['user']['islogin'] === '1' ) ) ? true : $bool;
        return $bool;
    }
    public function getUserId(){
        return (int)$_SESSION['user']['user_id'];
    }
    public function isSchidUsed( $schid ){
        $query = sprintf( "SELECT count(user_schid) AS num FROM %s WHERE is_delete = 0 AND user_schid = '%s'",
            $this->table, $schid );
        $result = C::query( $query, $this->dbc );
        if( $result ){
            $rows = mysql_fetch_array( $result );
            //$rows['num']为string类型，所以要加上int
            $bool = ( (int)$rows['num'] === 0 ) ? false : true;
            if( (int)$rows['num'] >1 ){
                $error = new Error( "THE database has a schid more than 2 user,it's ".$schid.'rows_num'.$rows['num'] );
                $error->dealWith();
            }
            return $bool;
        }else{
            $error = new Error( mysql_error($this->dbc) );
            $error->dealWith();
        }
    }
    public function mkUserDir( $userid ){
        //$dirname = dirname(__FILE__).'/users/six';
        /* 		$dirname = $this->arr['root_dir'].$this->arr['xml']->user['dir'];
                $user_source_filename = $dirname.'user.xml';
                $str_id = '';
                for( $i = 6-strlen($userid.''); $i>0; $i-- ){
                    $str_id .= '0';
                }
                $str_id .= $userid;
                for( $i = 0; $i < 3; $i++ ){
                    $dirname .= '/'.substr( $str_id, $i*2, 2 );
                } */
        $user_source_filename = dirname(__FILE__).'/users/user.xml';
        $xmlurl = $this->getUserXmlUrl( $userid );
        $dir = new Dirs();
        $dir->mkDir( dirname($xmlurl) );
        if( !is_file($xmlurl) ){
            copy( $user_source_filename, $xmlurl );
        }
    }
    public function getInfoByUserId( $id ){	//no pass back
        $query = sprintf("SELECT user_id,user_desc,user_type,user_schid,user_img,user_nick FROM %s WHERE user_id = %d AND is_delete=0 LIMIT 1",
            $this->table, $id );
        $result = C::query( $query, $this->dbc );
        return mysql_fetch_array( $result );
    }
    public function getUsersRoll(){
        $back = '';
        $back .= "
			<div style='width:730px;height:250px;margin-top:20px;'>
				<div class='aj-gds-roll-x'>
					<div class='aj-top'>
						<div class='aj-nav'>
							<div class='aj-nav-one aj-select'>知名校友</div>
							<div class='aj-nav-one'>热心同学</div>
						</div>
						<div class='aj-roll-zhishi'>
							<div class='aj-small-balls'>
								<a href=''>全部&gt;</a>
							</div>
							<div class='aj-small-balls' style='display:none;'>
								<a href=''>全部&gt;</a>
							</div>
						</div>
						<div class='aj-clear'></div>
					</div>
					<div class='aj-mid'>
						<div class='aj-roll-block' style='display:block;'>
							<div class='aj-roll-x-hk aj-tran' aj-index='left'>&lt;</div>
							<div class='aj-roll-x-hk aj-tran' aj-index='right'>&gt;</div>
							<div class='aj-imgs-wrap'>
								<div class='aj-all-imgs-move' aj-index='1' aj-total-pages='2' aj-can-roll='1'>
		";
        $back .= $this->getFamousHotUsers( 'famous' );
        $back .="
								</div>
							</div>
						</div>
						<div class='aj-roll-block'>
							<div class='aj-roll-x-hk aj-tran' aj-index='left'>&lt;</div>
							<div class='aj-roll-x-hk aj-tran' aj-index='right'>&gt;</div>
							<div class='aj-imgs-wrap'>
								<div class='aj-all-imgs-move' aj-index='1' aj-total-pages='2' aj-can-roll='1'>
		";
        $back .= $this->getFamousHotUsers( 'hot' );
        $back .="
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		";

        $back .= "<script src='{$this->arr['root_dir']}/js/user_module.js'></script>";
        return $back;
    }
    public function getFamousHotUsers( $type = '0' ){
        $back = '';
        if( $type !== '0' ){
            $type = $this->arr['xml']->user->type->{$type}['type'];
        }
        $arr = $this->getUserByType( $type );
        foreach( $arr as $rows ){
            $name = (isset( $rows['user_nick'] ) AND strlen($rows['user_nick'])>1) ? $rows['user_nick'] : $rows['user_schid'];
            $back .= "
				<a href='{$this->arr['index_url']}?r=1&kind1=a9&user_center_id={$rows['user_id']}' class='aj-img-one'>
					<img class='aj-img' src='{$this->arr['root_dir']}img/aj/user/cartoon/{$rows['user_img']}' />
					<p class='aj-price'>{$name}</p>
					<p class='aj-name'>{$rows['user_desc']}</p>
				</a>
			";
        }
        return $back;
    }
    public function getUserByType( $type = '0', $page = 1, $pageNum = 20 ){
        $query = sprintf( "SELECT user_id,user_img,user_desc,user_schid,user_nick,user_type,UNIX_TIMESTAMP(date_entered) AS time
					FROM %s WHERE is_delete = 0 AND user_type = '%s' ORDER BY date_entered DESC LIMIT %d,%d", $this->table, $type, ($page-1)*$pageNum, $pageNum );
        $result = C::query( $query, $this->arr['dbc'] );
        if( $result ){
            $arr = array();
            while( $rows = mysql_fetch_array($result) ){
                $arr[] = $rows;
            }
            return $arr;
        }else{
            $ex = new Error( mysql_error($this->arr['dbc']).__FILE__ );
            $ex->dealWith();
        }
    }
    public function wrapUserImgUrl( $url ){
        $root = $this->arr['root_dir'];
        $dir = $this->arr['xml']->user->userimg['dir'];
        $dir .= "cartoon/";
        return $root.$dir.$url;
    }
    public function getUserCenter( $user_id ){ 	//根据user_id获取页面
        $back = '';
        $kind2 = $this->arr['kind2'];
        $userInfoArr = $this->getInfoByUserId( $user_id );
        $user_img_dir = strtolower($this->arr['xml']->user->userimg['dir']);
        $user_img_dir .= "cartoon/";
        $nick = ( isset($userInfoArr['user_nick']) AND $userInfoArr['user_nick'] !== '' ) ? $userInfoArr['user_nick'] : $userInfoArr['user_schid'];
        $userXml = $this->loadUserXmlById( $user_id );
        $center_page = (int)$this->arr['user_center_page'];
        $daohang = new Daohang( $this->arr );
        $canChangeUserImage = '0';
        if ($this->isThisUser($user_id)) {
            $canChangeUserImage = '1';
        }
        $back .= "
			<div style='width:960px;margin:20px auto;'>
				<div class='aj-user-index-page'>
					<div class='aj-top'>
						<div class='aj-user-info'>
							<div class='aj-user-img' aj-is-can-change-image='{$canChangeUserImage}'>
								<img src='{$this->arr['root_dir']}{$user_img_dir}{$userInfoArr['user_img']}' />
							</div>
							<p class='aj-user-name'>{$nick}</p>
							<p class='aj-user-desc'>{$userInfoArr['user_desc']}</p>
						</div>
					</div>
					<div class='aj-nav'>
						<div class='aj-nav-ul-wrap'>
							<table class='aj-nav-ul'>
								<tr>
		";
        for( $arr = $this->arr['xml']->user->center->block->one ,$i = 0; $i< count($arr); $i++ ){
            $jump_url = $daohang->wrapUrl2( array( 'user_center_page'=>($i+1) ) );
            if( $center_page === ($i+1) ){
                $back .= "
					<td class='aj-nav-li aj-select'><a href='{$jump_url}'>{$arr[$i]['title']}</a></td>
				";
            }else{
                $back .= "
					<td class='aj-nav-li'><a href='{$jump_url}'>{$arr[$i]['title']}</a></td>
				";
            }
        }

        $back .= "
								</tr>
							</table>
						</div>
					</div>
					<div class='aj-block'>
						<div class='aj-block-inside'>
		";
        switch( $center_page ){
            case 2:
                $back .= $this->getXueshuOf( $user_id );
                break;
            case 3:
                break;
            case 1:
            default:
                $back .= $this->getGeRenDang($user_id);
                break;
        }
        $back .= "
						</div>
					</div>
				</div>
			</div>
		";
        return $back;
    }
    public function getXueshuOf( $user_id ){
        $xueshu = new Xueshu( $this->arr );
        $back = $xueshu->getXueshuOfUserId( $user_id );
        return $back;
    }
    public function loadUserXmlById( $user_id ){

    }
    public function getGeRenDang($id){ // 个人档
        $back = '';
        $file = dirname(__FILE__)."/users/self/".$id.'.txt';
        $demo = dirname(__FILE__)."/users/self/demo.txt";
        $form = dirname(__FILE__)."/users/self/form.txt";
        if (is_file($file)) {
            $back .= file_get_contents($file);
        } else {
            $back .= file_get_contents($demo);
        }
        $back .= file_get_contents($form);
        $back .= "
			<form id='aj-form-info-user-id' style='display:none;'>
				<input type='hidden' name='user_id' value ='{$id}' />
			</form>
		";
        return $back;
    }
    public function getUserXmlUrl( $user_id ){
        $str_id = '';
        //$dirname = $this->arr['root_dir'].$this->arr['xml']->user['dir'];
        $dirname = dirname(__FILE__).'/users/six/';
        for( $i = 6-strlen($user_id.''); $i>0; $i-- ){
            $str_id .= '0';
        }
        $str_id .= $user_id;
        for( $i = 0; $i < 3; $i++ ){
            $dirname .= '/'.substr( $str_id, $i*2, 2 );
        }
        $dirname .= '/user.xml';
        return $dirname;
    }
    public function saveGerendangInSQL($arr) { // 个人档 update数据库
        $nickname = C::safe(urldecode($arr['nickname']), $this->dbc);
        $desc = C::safe(urldecode($arr['desc']), $this->dbc);
        $user_id = (int)$arr['user_id'];
        $query = sprintf("UPDATE %s SET user_nick = '%s', user_desc = '%s' WHERE user_id = %d LIMIT 1",
            $this->table, $nickname, $desc, $user_id);
        $result = C::query($query, $this->dbc);
        if ($result) {
            $error = new Error("UPDATE user nickname and desc ok--".$query);
            $error->dealWith();
        } else {
            $error = new Error(mysql_error($result));
            $error->dealWith();
        }
    }
    public function modifyGerendang($id){ // 修改个人档到文件中 包括update数据库
        $arr = array();
        $names = array(
            "nickname", 'realname', 'major', 'sex',
            'birthday', 'blog', 'desc', 'qq', 'email'
        );
        $sqlArr = array(
            'nickname' => $_GET['nickname'],
            'desc' => $_GET['desc'],
            'user_id' => $id
        );
        $this->saveGerendangInSQL($sqlArr);
        foreach($names as $name) {
            if (isset($_GET[$name])) {
                $arr[$name] = htmlentities($_GET[$name]);
            } else {
                $arr[$name] = '未设置';
            }
        }
        $back = "
			<div class='aj-geren-dang aj-geren-dang-show'>
				<div style='padding:20px;'>
					<div class='aj-top'>
						<h2 class='aj-title aj-float'>个人档</h2>
						<div class='aj-line aj-float'></div>
						<div class='aj-tools aj-float aj-modify' style='display:none;'>编辑</div>
					</div>
					<div class='aj-content'>
						<table>
							<tr class='aj-tr'>
								<td class='aj-td'>昵称</td>
								<td class='aj-td'>{$arr['nickname']}</td>
							</tr>
							<tr class='aj-tr'>
								<td class='aj-td'>真实姓名</td>
								<td class='aj-td'>{$arr['realname']}</td>
							</tr>
							<tr class='aj-tr'>
								<td class='aj-td'>专业</td>
								<td class='aj-td'>{$arr['major']}</td>
							</tr>
							<tr class='aj-tr'>
								<td class='aj-td'>性别</td>
								<td class='aj-td'>{$arr['sex']}</td>
							</tr>
							<tr class='aj-tr'>
								<td class='aj-td'>生日</td>
								<td class='aj-td'>{$arr['birthday']}</td>
							</tr>
							<tr class='aj-tr'>
								<td class='aj-td'>博客地址</td>
								<td class='aj-td'>{$arr['blog']}</td>
							</tr>
							<tr class='aj-tr'>
								<td class='aj-td'>简介</td>
								<td class='aj-td'>{$arr['desc']}</td>
							</tr>
							<tr class='aj-tr'>
								<td class='aj-td'>QQ</td>
								<td class='aj-td'>{$arr['qq']}</td>
							</tr>
							<tr class='aj-tr'>
								<td class='aj-td'>邮箱</td>
								<td class='aj-td'>{$arr['email']}</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		";
        if (file_put_contents(dirname(__FILE__).'/users/self/'.$id.'.txt', $back)) {
            $arr = array(
                'isok' => '1',
                'info' => ''
            );
        } else {
            $arr = array(
                'isok' => '0',
                'info' => 'write file error'
            );
        }
        return $arr;
    }
    public function modifySelfImg($arr) {
        // $arr['src'] ,, $arr['id']
        if (!$this->isLogin() OR !$this->isThisUser($arr['id'])) {
            return array(
                'isok' => '0',
                'info' => 'user error'
            );
        }
        $query = sprintf("UPDATE %s SET user_img = '%s' WHERE user_id = %d LIMIT 1",
            $this->table, C::safe($arr['src'], $this->dbc), C::safe($arr['id'], $this->dbc));
        if (C::query($query, $this->dbc)) {
            return array(
                'isok' => '1',
                'info' => 'ok'
            );
        } else {
            return array(
                'isok' => '0',
                'info' => mysql_error($this->dbc)
            );
        }
    }
    public function isAdmin() {
        $id = $this->getUserId();
        $query = sprintf("SELECT is_admin FROM %s WHERE user_id = %d LIMIT 1",
            $this->table, $id);
        $result = C::query($query, $this->dbc);
        if ($result) {
            $rows = mysql_fetch_array($result);
            if ($rows['is_admin'].'' === '1') {
                return true;
            } else {
                return false;
            }
        } else {
            //(new Error(mysql_error($this->dbc)))->dealWith();
            return false;
        }
    }
}

class Dirs{
    function __construct(){}
    public function mkDir( $dir ){
        $arr = array();
        $bool = true;
        while( !is_dir($dir) ){
            array_push( $arr, $dir );
            $dir = dirname( $dir );
        }
        for( $i = count($arr)-1 ; $i >=0; $i-- ){
            if( !mkdir( $arr[$i] ) ){
                $bool = false;
            }
        }
        return $bool;
    }
}

class Query{
    protected $way, $arr, $dbc;
    function __construct( $arr ){
        C::sessionStart();
        $this->arr = $arr;
        $this->way = isset($_GET['way']) ? (int)$_GET['way'] : (int)$_POST['way'];
        $this->dbc = $this->arr['dbc'];
    }
    public function isQueryValid(){
        $bool = false;
        if( isset($_GET['page_token']) OR isset($_POST['page_token']) ){
            $token = (isset($_GET['page_token'])) ? $_GET['page_token'] : $_POST['page_token'];
            if( $token === $_SESSION['token']['page'] ){
                $bool = true;
            }else{
                $info = 'Token not match!server:'.$_SESSION['token']['page'].';send:'.$token;
            }
        }else{
            $info = 'page_token is not defined !';
        }
        if( isset($info) ){
            $error = new Error($info);
            $error->dealWith();
        }
        return $bool;
    }
    public function dealWithPost(){
        /*
        *	1.sign in
        *	2.sign up
        *	3.submit xueshu
        *	4.submit xueshu huida
        */
        $way = $this->way;
        if( $way === 1 OR $way === 2 ){
            $name = $_POST['name'];
            $pass = $_POST['pass'];
            $verify_code = $_POST['verifycode'];
            $sign_token = $_POST['signToken'];
            $verify_name = ($way===1) ? 'in' : 'up';
            $bool = false;

            if( $sign_token !== $_SESSION['token']['sign'] ){
                $arr = array(
                    'isok' => '0',
                    'code' => '2',
                    'info' => 'sign token wrong'
                );
            }else{
                if( strtolower($verify_code) === strtolower($_SESSION['verify_code'][$verify_name]) ){
                    $bool = true;
                }else{
                    $arr = array(
                        'isok' => '0',
                        'code' => '1',
                        'info' => 'wrong verify_code'
                    );
                }
            }
            if( $bool ){	//OK,执行开始！
                switch( $this->way ){
                    case 1:		//sign in
                        $arr = array();
                        $arr['name'] = $name;
                        $arr['pass'] = $pass;

                        $user = new User( $this->arr );
                        $arr = $user->signIn($arr);
                        break;
                    case 2:		//sign up
                        $arr = array();
                        $arr['name'] = $name;
                        $arr['pass'] = $pass;

                        $user = new User( $this->arr );
                        $arr = $user->signUp($arr);
                        break;
                }
            }
            echo json_encode($arr);
        }
        if( $way === 3 ){

            $arr = array();
            $arr['kinds'] = C::safe( $_POST['kinds'], $this->dbc );
            $arr['title'] = C::safe( $_POST['title'], $this->dbc );
            $arr['content'] = urldecode($_POST['content']);

            $xueshu = new Xueshu( $this->arr );
            $arr = $xueshu->insertXueshu( $arr );
            echo json_encode( $arr );
        }
        if( $way === 4 ){
            $user = new User( $this->arr );
            if( !$user->isLogin() ){
                $arr = array(
                    "isok" => 0,
                    "code" => 1,
                    "info" => 'Not sign in'
                );
                echo json_encode( $arr );
                exit();
            }
            $content = Safe::removeXSS( urldecode($_POST['content']) );
            $id = (int) $_POST['id'];
            $arr = array(
                "kinds" => "b1",
                "title" => "",
                "content" => $content,
                "huida_id" => $id
            );
            $xueshu = new Xueshu( $this->arr );
            $arr = $xueshu->insertXueshu( $arr );
            echo json_encode( $arr );
            exit();
        }
    }
    public function dealWithGet(){
        /*
        * 	1.verify code service
        * 	2.logout
        * 	3.modify geren dang
        * 	4.modify user image
        */
        if( $_GET['way'] === '1' ){
            $v = new VerifyCode( $this->arr );
            $code = $v->getCode();

            $_SESSION['verify_code'] = isset($_SESSION['verify_code']) ? $_SESSION['verify_code'] : array();
            switch( $_GET['kind'] ){
                case 'signup':
                    $_SESSION['verify_code']['up'] = $code;
                    break;
                case 'signin':
                    $_SESSION['verify_code']['in'] = $code;
                    break;
                case 'admin':
                    $_SESSION['verify_code']['admin'] = $code;
                    break;
            }
        }
        if( $_GET['way'] === '2' ){
            $user = new User( $this->arr );
            $bool = $user->logout();
            $arr = array(
                'isok' => '1',
                'info' => '0'
            );
            echo json_encode( $arr );
        }
        if ($_GET['way'] === '3') {
            $id = (int)$_GET['user_id'];
            $user = new User($this->arr);
            $bool = false;
            if ($user->isThisUser($id)) {
                $bool = true;
            }
            if ($bool) {
                $arr = $user->modifyGerendang($id.'');
            } else {
                $arr = array(
                    'isok' => '0',
                    'info' => 'user verify error'
                );
            }
            echo json_encode($arr);
        }
        if ($_GET['way'] === '4') {
            $src = C::safe($_GET['src'], $this->dbc);
            $id = (int)$_GET['id'];
            $arr = array(
                'isok' => '1',
                'src' => $src,
                'id' => $id
            );
            $user = new User($this->arr);
            $arr = $user->modifySelfImg($arr);
            echo json_encode($arr);
            exit();
        }
    }
}

class Health{
    protected $arr;
    function __construct( $arr ){
        $this->arr = $arr;
    }
    public function getPage(){
        $back = '';
        $root = $this->arr['root_dir'];
        $back .= "
			<div id='xy_health_niwenwoda_body'>
				<div id='xy_health_niwenwoda_block-1'>
					<div class='xy_health_niwenwoda_block-1_div'>
						<img src='{$root}img/xy/health_zhiyuanzh_1.jpg' class='xy_health_niwenwoda_block-1_div1_img'/>
						<p class='xy_health_niwenwoda_block-1_div1_p1'>社交恐怖症都有类似的躯体症状：口干、出汗、心跳剧烈、想上厕所。周围的人可能会看到的症状有：红脸、口吃结巴、轻微战抖。有时候，患者发现自己呼吸急促，手脚冰凉。 ......</p>
						<p></p>
					</div>
					<div class='xy_health_niwenwoda_block-1_div'>
						<div class='xy_health_niwenwoda_block-1_div2-div2'>
							<div class='xy_health_niwenwoda_block-1_div2_div'>
								<p class='xy_health_niwenwoda_block-1_div2_p1'>15张内容丰富的心理健康手抄报</p>
								<p class='xy_health_niwenwoda_block-1_div2_p2'>心理健康手抄报是以心理健康为内容的手抄报。在学校，手抄报是第二课堂的一种很好的活动形式… [查看全文]</p>
							</div>
							<div class='xy_health_niwenwoda_block-1_div2_div'>
								<p class='xy_health_niwenwoda_block-1_div2_p1'>精选马年手抄报花边 简单又漂亮</p>
								<p class='xy_health_niwenwoda_block-1_div2_p2'>无论是做新年手抄报，还是元旦手抄报。每一期的手抄报，版面很有限，要办出特色，必须在内容…</p>
							</div>
							<div class='xy_health_niwenwoda_block-1_div2_div1'>
								<ul>
									<li class='xy_health_niwenwoda_block-1_div2_li'><a>心理健康手抄报：心理咨询有何作用</a></li>
									<li class='xy_health_niwenwoda_block-1_div2_li'><a>心理健康手抄报：小学生心理健康教育</a></li>
									<li class='xy_health_niwenwoda_block-1_div2_li'><a>心理健康手抄报资料：世界卫生日</a></li>
									<li class='xy_health_niwenwoda_block-1_div2_li'><a>心理健康手抄板：怎样帮助心理异常的同</a></li>
									<li class='xy_health_niwenwoda_block-1_div2_li'><a>心理健康手抄报：你是否在心理防御</a></li>
									<li class='xy_health_niwenwoda_block-1_div2_li'><a>心理健康手抄报：小学生心理缺陷的表现</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div id='xy_health_niwenwoda_block0'>
					<p class='xy_health_niwenwoda_block0_p'><img src='{$root}img/xy/health_niwenwoda_xiaowu.jpg'/>你问我答</p>
					<hr class='xy_health_niwenwoda_block0_hr'/>
				</div>
				<div id='xy_health_niwenwoda_block1'>
					<div class='xy_health_niwenwoda_block1_div'>
						<img src='{$root}img/xy/health_niwenwoda_div1.jpg' class='xy_health_niwenwoda_block1_div_img'/>
						<div class='xy_health_niwenwoda_block1_div_collect'>
							<a  class='xy_health_niwenwoda_block1_div_collect_a'>心理健康手抄报：早恋的类型</a>
							<p class='xy_health_niwenwoda_block1_div_collect_p'>青少年由于生理发育和性成熟，很容易产生性冲动，对异性变得很敏感，渴望了解异性的心理和生理，了解异性对自己的态度。为了满足这种好奇心，就想结交异性朋友，建立恋爱关系。 </p>
						</div>
					</div>
					<hr class='xy_health_niwenwoda_hr'/>
					<div class='xy_health_niwenwoda_block1_div'>
						<img src='{$root}img/xy/health_niwenwoda_div2.jpg' class='xy_health_niwenwoda_block1_div_img'/>
						<div class='xy_health_niwenwoda_block1_div_collect'>
							<a  class='xy_health_niwenwoda_block1_div_collect_a'>心理健康手抄报：三年级学生的共性问题</a>
							<p class='xy_health_niwenwoda_block1_div_collect_p'>三年级的学生会遇到哪些问题？学习上主动性、自觉性不强，不会合理安排时间，不能很好地排除干扰，集中注意力。心理上出现的问题很多，如：爱表现，承爱批评的能力差距极大。 </p>
						</div>
					</div>
					<hr class='xy_health_niwenwoda_hr'/>
					<div class='xy_health_niwenwoda_block1_div'>
						<img src='{$root}img/xy/health_niwenwoda_div3.jpg' class='xy_health_niwenwoda_block1_div_img'/>
						<div class='xy_health_niwenwoda_block1_div_collect'>
							<a  class='xy_health_niwenwoda_block1_div_collect_a'>心理健康手抄报：如何改善失眠</a>
							<p class='xy_health_niwenwoda_block1_div_collect_p'>睡前避免观看紧张刺激的电视、电影、报纸，如凶杀案、绑架案等，造成心理不安而影响入睡;辗转难眠几刻后仍不能入睡，干脆起床做些轻松活动，继续躺在床上只会使你更加紧张，更难入睡。</p>
						</div>
					</div>
					<hr class='xy_health_niwenwoda_hr'/>
					<div class='xy_health_niwenwoda_block1_div'>
						<img src='{$root}img/xy/health_niwenwoda_div4.jpg' class='xy_health_niwenwoda_block1_div_img'/>
						<div class='xy_health_niwenwoda_block1_div_collect'>
							<a  class='xy_health_niwenwoda_block1_div_collect_a'>心理健康手抄报：心理防御的种类</a>
							<p class='xy_health_niwenwoda_block1_div_collect_p'>你知道心理防御是什么吗？你是否有这种倾向？外投射,将自己内心不为外界所接受的想法,欲望,情感归咎于他人.比如,一个恨别人的人,潜抑,就是将不能接受的想法除去</p>
						</div>
					</div>
					<hr class='xy_health_niwenwoda_hr'/>
					<div class='xy_health_niwenwoda_block1_div'>
						<img src='{$root}img/xy/health_niwenwoda_div5.jpg' class='xy_health_niwenwoda_block1_div_img'/>
						<div class='xy_health_niwenwoda_block1_div_collect'>
							<a  class='xy_health_niwenwoda_block1_div_collect_a'>心理健康手抄报：坚信孩子是优秀的</a>
							<p class='xy_health_niwenwoda_block1_div_collect_p'>坚信自己的孩子是优秀的，承认孩子的优点，对他的未来充满信心，给他积极的暗示。如果自己的孩子与别人的孩子在某一方面相比成绩平平，甚至远不如别的孩子，也要坚信自己的孩子在另外一些方面是优秀的</p>
						</div>
					</div>
					<hr class='xy_health_niwenwoda_hr'/>
					<div class='xy_health_niwenwoda_block1_div'>
						<img src='{$root}img/xy/health_niwenwoda_div6.jpg' class='xy_health_niwenwoda_block1_div_img'/>
						<div class='xy_health_niwenwoda_block1_div_collect'>
							<a class='xy_health_niwenwoda_block1_div_collect_a'>心理健康手抄报：和-谐的环境</a>
							<p class='xy_health_niwenwoda_block1_div_collect_p'>仿效和接受，成为小学生行为的指南和方向。因此，作为一个班主任老师，我十分重视班风建设，经常举行班会活动，愿把班级建设成一个团结、向上、友爱、创新的班集体，让全班学生人人心理健康。</p>
						</div>
					</div>
				</div>
				<div id='xy_health_niwenwoda_block2'>
					<div class='xy_health_niwenwoda_block2_div1'>
						<p class='xy_health_niwenwoda_block2_p'>志愿者基本要求</p>
						<ul>
							<li class='xy_health_niwenwoda_block2_div1_li'>1、热爱公益事业，希望为公益活动做出自己的一份贡献。</li>
							<li class='xy_health_niwenwoda_block2_div1_li'>2、严肃工作作风与工作纪律。</li>
							<li class='xy_health_niwenwoda_block2_div1_li'>3、艰苦朴素，谦虚谨慎。</li>
							<li class='xy_health_niwenwoda_block2_div1_li'>4、不计较个人得失。</li>
							<li class='xy_health_niwenwoda_block2_div1_li'>5、按时完成指定的工作任务和项目，保证服务质量；</li>
							<li class='xy_health_niwenwoda_block2_div1_li'>6、洁身自爱，树立形象。</li>
							<li class='xy_health_niwenwoda_block2_div1_li'>7、工作时间保持通讯畅通，遇到问题及时反馈。</li>
							<li class='xy_health_niwenwoda_block2_div1_li'>8、强化安全、责任、保密意识，在工作中做到安全服务。</li>
						</ul>
					</div>
					<div class='xy_health_niwenwoda_block2_div2'>
						<p class='xy_health_niwenwoda_block2_p'>心理健康小知识</p>
						<div id='xy_health_niwenwoda_block2_div1'>
							<div>
								<p class='xy_health_niwenwoda_block2_div1_p1'>1、智力正常<img src='{$root}img/xy/health_niwenwoda_zhishi1.jpg' class='xy_health_niwenwoda_block2_div1_p1_img'/></p>
								<p class='xy_health_niwenwoda_block2_div1_p2'>一是乐于与人交往，既有稳定而广泛的人际关系，又有知己的朋友；二是在交往中保持独立而完整的人格，有自知之明，不卑不亢；三是能客观评价别人，以人之长补己之短，宽以待人，友好相处，乐于助人；四是交往中积极态度多于消极态度。</p>
							</div>
							<div>
								<p class='xy_health_niwenwoda_block2_div1_p1'>2、具有较强的意志品质<img src='{$root}img/xy/health_niwenwoda_zhishi2.jpg' class='xy_health_niwenwoda_block2_div1_p1_img'/></p>
								<p class='xy_health_niwenwoda_block2_div1_p2'>健康的意志有如下特点:目的明确合理，自觉性高;善于分析情况，意志果断;意志坚韧，有毅力，心理承受能力强;自制力好，既有现实目标的坚定性，又能克制干扰目标实现的愿望、动机、情绪和行为，不放纵任性。</p>
							</div>
							<div>
								<p class='xy_health_niwenwoda_block2_div1_p1'>3、人际关系和谐<img src='{$root}img/xy/health_niwenwoda_zhishi3.jpg' class='xy_health_niwenwoda_block2_div1_p1_img'/></p>
								<p class='xy_health_niwenwoda_block2_div1_p2'>一是乐于与人交往，既有稳定而广泛的人际关系，又有知己的朋友；二是在交往中保持独立而完整的人格，有自知之明，不卑不亢；三是能客观评价别人，以人之长补己之短，宽以待人，友好相处，乐于助人；四是交往中积极态度多于消极态度。 </p>
							</div>
						</div>
					</div>

				</div>
			</div>
		";
        return $back;
    }

}

class VerifyCode{
    protected $arr;
    function __construct( $arr ){
        C::sessionStart();
        $this->arr = $arr;
    }
    public function getCode($num = 4, $size = 20, $width = 0, $height = 0) {
        !$width && $width = $num * $size * 4 / 5 + 10;
        !$height && $height = $size + 10;
        $root_dir = $this->arr['root_dir'];
        $ttf_url = dirname( dirname(__FILE__) )."/source/mywanderingheart.ttf";
        //如果字体路径错误：会无法显示验证码，但是有图像（后面这一点得看情况）
        // 去掉了 0 1 O l 等
        $str = "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVW";
        $code = '';

        for ($i = 0; $i < $num; $i++) {
            $code .= $str[rand(0, strlen($str)-1)];
        }
        // 画图像
        $im = imagecreatetruecolor($width, $height);
        // 定义要用到的颜色
        $back_color = imagecolorallocate($im, 235, 236, 237);
        $boer_color = imagecolorallocate($im, 118, 151, 199);
        $text_color = imagecolorallocate($im, mt_rand(0, 200), mt_rand(0, 120), mt_rand(0, 120));
        // 画背景
        imagefilledrectangle($im, 0, 0, $width, $height, $back_color);
        // 画边框
        imagerectangle($im, 0, 0, $width-1, $height-1, $boer_color);
        // 画干扰线
        for($i = 0;$i < 5;$i++) {
            $font_color = imagecolorallocate($im, mt_rand(0, 255), mt_rand(0, 255), mt_rand(0, 255));
            imagearc($im, mt_rand(- $width, $width), mt_rand(- $height, $height), mt_rand(30, $width * 2), mt_rand(20, $height * 2), mt_rand(0, 360), mt_rand(0, 360), $font_color);
        }
        // 画干扰点
        for($i = 0;$i < 50;$i++) {
            $font_color = imagecolorallocate($im, mt_rand(0, 255), mt_rand(0, 255), mt_rand(0, 255));
            imagesetpixel($im, mt_rand(0, $width), mt_rand(0, $height), $font_color);
        }
        // 画验证码
        //@imagefttext($im, $size , 0, 5, $size + 3, $text_color, 'c:\\WINDOWS\\Fonts\\simsun.ttc', $code);
        @imagefttext($im, $size , 0, 5, $size + 3, $text_color, $ttf_url, $code);
        //@session_start();
        //$_SESSION["verify_code"] = $code;

        header("Cache-Control: max-age=1, s-maxage=1, no-cache, must-revalidate");
        header("Content-type: image/png;charset=utf-8");
        imagepng( $im );
        imagedestroy( $im );
        //( new Error($code.'---'.$ttf_url) )->dealWith();
        return $code;
    }
}

class Xueshu{
    protected $dbc, $xml, $arr, $table;
    function __construct( $arr ){
        $this->arr = $arr;
        $this->dbc = $arr['dbc'];
        $this->xml = $arr['xml'];
        $this->table = "aj_tumu_xueshu";
    }
    public function getXueshu(){
        $xml = $this->xml;
        $kindsArr = array();
        $back = '';
        $back .= $this->getXueshuBianjiArea();
        foreach( $xml->header->nav->li as $li ){
            if( $li['kind'] == 'a8' ){
                foreach( $li->span as $span ){
                    //$kindsArr[] = $span['kind'];
                    $kindsArr[] = array(
                        'kind' => $span['kind'],
                        'title' => $span['title']
                    );
                }
                break;
            }
        }
        foreach( $kindsArr as $kind ){
            $back .= $this->getXueshuWhich( $kind );
        }
        return $back;
    }
    public function getXueshuWhich( $kind_two ){
        $back = '';
        $xs_num = 10;
        $kind = $kind_two['kind'];
        $totalNum = $this->getTotalNumOf( $kind );
        $totalPages = ceil( $totalNum / $xs_num );
        $kind = strtolower( $kind );

        $pageStr = $this->arr['xueshu_page'];
        $page = 1;
        if( $pageStr !== 1 ){
            $arr1 = explode( '_', $this->arr['xueshu_page'] );
            $page = ( strtolower($arr1[0]) === $kind )? (int)$arr1[1] : $page;
        }
        $back .= "
			<div style='position:relative;'>
				<h1 id='xueshu_{$kind}'>{$kind_two['title']}</h1>
				<h1>{$kind_two['title']}<span style='font-size:12px;margin-left:20px;'>Page:{$page}/{$totalPages}</span></h1>
			</div>
		";
        $query = sprintf("SELECT xueshu_id,huida_id,user_id,kinds,title,content,huida,filename,UNIX_TIMESTAMP(date_entered) AS time
						FROM %s WHERE kinds='%s' AND huida_id = 0 ORDER BY date_entered DESC LIMIT %d,%d",
            $this->table, $kind, ($page-1)*$xs_num, $xs_num );
        $result = C::query( $query, $this->dbc );


        if( $result ){
            $back_xs_num = mysql_num_rows( $result );
            if( $back_xs_num !== 0 ){
                $back .= "<div class='aj-xueshu-wrap'>";
                while( $rows = mysql_fetch_array($result) ){
                    $back .= $this->wrapXueshu( $rows );
                }
                $back .= $this->getDaoHang( $kind, $page, $totalPages );
                $back .= "</div>";
            }else{
                $back .= "<h3 style='line-height:30px;margin-left:10px;'>no more~~</h3>";
            }
        }
        return $back;
    }
    public function getTotalNumOf( $kind ){
        $query = sprintf("SELECT count(xueshu_id) AS num FROM %s WHERE huida_id = 0 AND is_delete = 0 AND kinds = '%s' " , $this->table, $kind );
        $result = C::query( $query, $this->dbc );
        if( $result ){
            $numArr = mysql_fetch_array( $result );
            $num = $numArr['num'];
        }else{
            $error =  new Error( mysql_error($this->dbc) ) ;
            $error->dealWith();
        }
        return $num;
    }
    public function getTotalNumOfUserId( $user_id ){
        $query = sprintf("SELECT count(xueshu_id) AS num FROM %s WHERE huida_id = 0 AND is_delete = 0 AND user_id = %d " , $this->table, $user_id );
        $result = C::query( $query, $this->dbc );
        if( $result ){
            $numArr = mysql_fetch_array( $result );
            $num = $numArr['num'];
        }else{
            $error =  new Error( mysql_error($this->dbc) ) ;
            $error->dealWith();
        }
        return $num;
    }
    public function getXueshuOfUserId( $user_id ){
        $back = '';
        $kind = 'user_xueshu_center_page';
        // $page = $this->arr[$kind];
        if (isset($_GET[$kind])) {
            $page = (int)$_GET[$kind];
        } else {
            $page = 1;
        }
        $pageNum = 10;
        $totalNum = $this->getTotalNumOfUserId( $user_id );
        $totalPages = ceil( $totalNum / $pageNum );
        $query = sprintf( "SELECT xueshu_id,huida_id,user_id,kinds,title,content,huida,filename,UNIX_TIMESTAMP(date_entered) AS time
						FROM %s WHERE user_id = %d AND huida_id = 0 ORDER BY date_entered DESC LIMIT %d,%d",
            $this->table, $user_id, ($page-1)*$pageNum, $pageNum );
        $result = C::query( $query, $this->arr['dbc'] );
        if( $result ){
            if( mysql_num_rows($result) > 0 ){
                $back .= "<div class='aj-xueshu-wrap'>";
                while( $rows = mysql_fetch_array($result) ){
                    $back .= $this->wrapXueshu( $rows );
                }
                $back .= "</div>";
                $this->arr['daohang'] = array();
                $this->arr['daohang']['page'] = $page;
                $this->arr['daohang']['totalPages'] = $totalPages;
                $this->arr['daohang']['kind'] = $kind;
                $daohang = new Daohang( $this->arr );
                $back .= $daohang->getDaoHang2();
            }else{
                $back .= "<h2>No more ~</h2>";
            }
        }else{
            $ex = new Error( mysql_error($this->arr['dbc']).__FILE__ );
            $ex->dealWith();
        }
        return $back;
    }
    public function wrapXueshu( $rows ){
        $back ='';

        $user = new User( $this->arr );
        $user_arr = $user->getInfoByUserId( $rows['user_id'] );

        $name = ($user_arr['user_nick'] === '') ? $user_arr['user_schid'] : $user_arr['user_nick'];
        $time = C::dateShow( $rows['time'], time() );
        $content = $rows['content'];
        $huida_id = isset( $rows['huida_id'] ) ? (int)$rows['huida_id'] : 0;
        if( $rows['filename'] !== '0' ){
            $file_dir = $this->arr['xml']->xueshu['dir'];
            $content = file_get_contents( dirname( dirname(__FILE__) ).'/'.$file_dir.$rows['filename'] );
        }
        $i_answer_url = $this->arr['index_url']."?kind1=ab&xueshu_id=".$rows['xueshu_id'];
        $back .= "
			<div style='width:100%;'>
				<div class='aj-xueshu' aj-id='{$rows['xueshu_id']}' huida_id='{$rows['huida_id']}'>
					<div class='aj-title'><a href='{$i_answer_url}'>{$rows['title']}</a></div>
					<div class='aj-line'>
						<span class='aj-name aj-span'><a href='{$this->arr['index_url']}?r=1&kind1=a9&user_center_id={$rows['user_id']}'>{$name}</a></span>
						<span class=' aj-span'>发布于</span>
						<span class='aj-time aj-span'>{$time}</span>
					</div>
					<div class='aj-desc'>
					{$content}
					</div>
					<div class='aj-line'>
		";
        if( $huida_id === 0 ){
            $back.= "
						<span class='aj-span'>
							<span>{$rows['huida']}</span>
							<span>条回答</span>
						</span>
						<span class='aj-anwser aj-span'><a href='{$i_answer_url}'>我来回答</a></span>
			";
        }
        $back.="
					</div>
				</div>
			</div>
		";
        return $back;
    }
    protected function getDaoHang( $kind, $nowPage, $totalPages ){
        $back='';
        $indexUrl = $this->arr['url'];
        $daohang = new Daohang( $this->arr );

        $result = $daohang->wrapUrl( $kind, 1 );
        $back .= "
			<span class='aj-news-daohang' style='margin-top:20px;'>
			<a class='aj-a-btn' href='{$result}'>首页</a>
		";

        for( $i=1; $i <= $totalPages; $i++ ){
            $result = $this->wrapUrl( $kind, $i );

            if( $i === (int)$nowPage ){
                $back .= "<a class='aj-a-btn aj-select' href='javascript:void(0)'>{$i}</a>";
            }else{
                $back .= "<a class='aj-a-btn' href='{$result}'>{$i}</a>";
            }
        }
        $result = $this->wrapUrl( $kind, $totalPages );
        $back .= "
			<a class='aj-a-btn' href='{$result}'>尾页</a>
			</span>
		";
        return $back;
    }
    public function wrapUrl( $kind, $index ){
        $get_copy = $_GET;
        $get_copy['xueshu_page'] = $kind.'_'.$index;
        $arr = array();
        foreach( $get_copy as $key=>$val ){
            $arr[] = $key."=".$val;
        }
        $result = $this->arr['url'].'?'.implode( '&', $arr );
        $result .= '#xueshu_'.$kind;
        return $result;
    }
    public function getXueshuBianjiArea(){
        $back = '';
        $back .= "
			<div class='aj-xueshu_write aj-write-area'>
				<h2 class='aj-xueshu_title'>我要提问</h2>
		";
        $back .= "
				<select class='aj-select'>
		";
        foreach( $this->arr['xml']->header->nav->li as $li ){
            if( strtolower($li['kind']) === $this->arr['kind1'] ){
                foreach( $li->span as $span ){
                    $back .= "<option value='{$span['kind']}'>{$span['title']}</option>";
                }
                break;
            }
        }
        $back .= "
				</select>
		";
        $back .= "
				<div class='aj-title-wrap'>
					<textarea class='aj-title aj-textarea' placeholder='请输入标题'></textarea>
				</div>
				<div id='aj-container' name='content' type='text/plain'></div>
				<div class='aj-clear'></div>
				<div class='aj-button aj-submit'>提交</div>
			</div>
			<!-- 配置文件 -->
			<script type='text/javascript' src='{$this->arr['root_dir']}ueditor/ueditor.config.js'></script>
			<!-- 编辑器源码文件 -->
			<script type='text/javascript' src='{$this->arr['root_dir']}ueditor/ueditor.all.js'></script>
		";
        return $back;
    }
    public function insertXueshu( $arr ){
        $user = new User( $this->arr );
        if( $user->islogin() ){
            $user_id = $user->getUserId();
            $huida_id = isset($arr['huida_id']) ? (int)$arr['huida_id'] : 0;
            $kinds = C::safe( $arr['kinds'], $this->dbc );
            $title = C::safe( $arr['title'], $this->dbc );
            $content = Safe::removeXSS( $arr['content'] );

            $filename = sha1(uniqid().$user_id).'.txt';

//			$table = $this->arr['xml']->xueshu['table'];
            $table = $this->table;
            $file_dir = $this->arr['xml']->xueshu['dir'];
            $root_dir = $this->arr['root_dir'];
            if( file_put_contents( dirname( dirname(__FILE__) ).'/'.$file_dir.$filename, $content ) ){
                $query = sprintf( "INSERT INTO %s (user_id,kinds,title,filename,huida_id)
						VALUES(%d,'%s','%s','%s', %d)", $table, $user_id, $kinds, $title, $filename, $huida_id );
                $result = C::query( $query, $this->dbc );


                if( $result ){
                    $arr = array(
                        'isok' => '1',
                        'info' => 'Ok',
                        'content'=> $content
                    );
                }else{
                    $arr = array(
                        'isok' => '0',
                        'code' => 3,
                        'info' => mysql_error( $this->dbc )
                    );
                }
                if( $huida_id !== 0 ){
                    $query = sprintf( "UPDATE %s SET huida = huida + 1 WHERE xueshu_id = %d" , $table, $huida_id );
                    C::query( $query, $this->dbc );
                }
            }else{
                $arr = array(
                    'isok' => '0',
                    'code' => 2,
                    'info' => 'can not write into file!'
                );
            }
        }else{
            $arr = array(
                'isok' => '0',
                'code' => 1,
                'info' => 'have not login!'
            );
        }
        return $arr;
    }
    public function getPageByXueshuId( $id ){
        $back = '';
        $query = sprintf("SELECT xueshu_id,huida_id,user_id,kinds,title,content,huida,filename,UNIX_TIMESTAMP(date_entered) AS time
				FROM %s WHERE xueshu_id = %d ", $this->table, $id );
        $result = C::query( $query, $this->dbc );
        if( $result ){
            if( mysql_num_rows($result) > 0 ){
                $rows = mysql_fetch_array( $result );

                $back .= $this->wrapXueshu( $rows );

                $query = sprintf("SELECT xueshu_id,huida_id,user_id,kinds,title,content,huida,filename,UNIX_TIMESTAMP(date_entered) AS time
				FROM %s WHERE huida_id = %d ORDER BY date_entered DESC", $this->table, $id );
                $result = C::query( $query, $this->dbc );
                if( mysql_num_rows($result) > 0 ){
                    $back .= "<h2>全部回复</h2>";
                    while( $rows2 = mysql_fetch_array($result) ){
                        $back .= $this->wrapXueshu( $rows2 );
                    }
                }else{
                    $back .= "<h2>还木有人回复这个帖子~</h2>";
                }
                $back .= $this->getXueshuHuidaArea( $rows );
            }else{
                $back .= "<h2>Not found!</h2>";
            }
        }else{
            $back .= "<h2>Not found!</h2>";
        }
        return $back;
    }
    public function getXueshuHuidaArea( $rows ){
        $id = $rows['xueshu_id'];
        $back = '';
        $back .= "<h2 style='margin-top:20px;height:40px;line-height:40px;border-top:1px solid #ccc;'>我来回答</h2>";
        $back .= "
			<div class='aj-xueshu-huida-area'>
				<form id='aj-xueshu-huida-area-form'>
					<div>
						<textarea name='content' style='width:500px;height:200px;padding:20px;' placeholder='请在这里输入内容~'></textarea>
					</div>
					<input type='hidden' name='xueshu-id' value='{$id}' />
				</form>
				<div class='aj-button aj-huida-submit' style='width:200px;'>提交</div>
			</div>
		";
        return $back;
    }
}

class WorkStudy{
    protected $arr;
    function __construct( $arr ){
        $this->arr = $arr;
    }
    public function getPage(){
        $back = '';
        $back .= "
			<div id='xy_jobTwo_body'>
				<div>
					<img src='{$this->arr['root_dir']}img/xy/jobTwo.jpg' class='xy_jobTwo_img'/>
				</div>
		";
        $page1 = 1;
        $page2 = 1;
        $page_str = $this->arr['news_page'];

        $news = new News( $this->arr );


        foreach( $this->arr['xml']->header->nav->li as $li ){
            if( strtolower($li['kind']) === 'a4' ){
                foreach( $li->span as $span ){
                    $title = strtolower( $span['title'] );
                    $skind = strtolower( $span['kind'] );
                    $news_type = (int)$span['news-type'];
                    if( $page_str === 1 ){
                        $page = 1;
                    }else{
                        $kind = substr( $page_str, 0, 2 );
                        if( $kind === $skind ){
                            $arr = explode( '_', $page_str );
                            $page = (int)$arr[1];
                        }else{
                            $page = 1;
                        }
                    }
                    $back .= $news->getNews( $news_type, $title, $page, 9, array('kind'=>"{$skind}"), 'wrapNews2' );
                    $back .= "</div>";
                }
            }
        }
        return $back;
    }
}

class Daohang{	//该导航模块不适用于 news_page = b1_1的形式，适用于 honor_page = 1 这种形式
    protected $arr;
    /* 	参数形如-----|
        $this->arr['daohang'] = array();
        $this->arr['daohang']['kind'] = String;
        $this->arr['daohang']['page'] = INT;
        $this->arr['daohang']['totalPages'] = INT;
        $this->arr['daohang']['location'] = String;
     */
    /*
       IN getDaoHang2
       $This->arr['daohang']['arr'] = array();
    */
    function __construct( $arr ){
        $this->arr = $arr;
    }
    public function getDaohang(){
        $back='';
        $indexUrl = $this->arr['url'];
        $kind = $this->arr['daohang']['kind'];
        $nowPage = (int)$this->arr['daohang']['page'];
        $totalPages = (int)$this->arr['daohang']['totalPages'];
        $location = isset($this->arr['daohang']['location']) ? $this->arr['daohang']['location'] : '';

        $result = $this->wrapUrl( $kind, 1, $location );
        $back .= "
			<span class='aj-news-daohang' style='margin-top:20px;'>
			<a class='aj-a-btn' href='{$result}'>首页</a>
		";

        for( $i=1; $i <= $totalPages; $i++ ){
            $result = $this->wrapUrl( $kind, $i, $location );

            if( $i === (int)$nowPage ){
                $back .= "<a class='aj-a-btn aj-select' href='javascript:void(0)'>{$i}</a>";
            }else{
                $back .= "<a class='aj-a-btn' href='{$result}'>{$i}</a>";
            }
        }
        $result = $this->wrapUrl( $kind, $totalPages, $location );
        $back .= "
			<a class='aj-a-btn' href='{$result}'>尾页</a>
			</span>
		";
        return $back;
    }
    public function wrapUrl( $kind, $index, $location = '' ){
        $get_copy = $_GET;
        $get_copy[$kind] = $index;
        $arr = array();
        foreach( $get_copy as $key=>$val ){
            $arr[] = $key."=".$val;
        }
        $result = $this->arr['url'].'?'.implode( '&', $arr );
        $result .= $location;
        return $result;
    }
    public function getDaoHang2(){
        $back='';
        $this->arr['daohang']['arr'] = isset($this->arr['daohang']['arr']) ? $this->arr['daohang']['arr'] : array();
        $indexUrl = $this->arr['url'];
        $kind = $this->arr['daohang']['kind'];
        $nowPage = (int)$this->arr['daohang']['page'];
        $totalPages = (int)$this->arr['daohang']['totalPages'];
        $location = isset($this->arr['daohang']['location']) ? $this->arr['daohang']['location'] : '';

        $this->arr['daohang']['arr'][$kind] = 1;
        $result = $this->wrapUrl2( $this->arr['daohang']['arr'], $location );
        $back .= "
			<span class='aj-news-daohang' style='margin-top:20px;'>
			<a class='aj-a-btn' href='{$result}'>首页</a>
		";

        for( $i=1; $i <= $totalPages; $i++ ){
            $this->arr['daohang']['arr'][$kind] = $i;
            $result = $this->wrapUrl2( $this->arr['daohang']['arr'], $location );

            if( $i === (int)$nowPage ){
                $back .= "<a class='aj-a-btn aj-select' href='javascript:void(0)'>{$i}</a>";
            }else{
                $back .= "<a class='aj-a-btn' href='{$result}'>{$i}</a>";
            }
        }
        $this->arr['daohang']['arr'][$kind] = $totalPages;
        $result = $this->wrapUrl2( $this->arr['daohang']['arr'], $location );
        $back .= "
			<a class='aj-a-btn' href='{$result}'>尾页</a>
			</span>
		";
        return $back;
    }
    public function wrapUrl2( $arr, $location = '' ){	//可以改变多个键值对
        $get_copy = $_GET;
        foreach( $arr as $key=>$val ){
            $get_copy[$key] = $val;
        }
        $arr = array();
        foreach( $get_copy as $key=>$val ){
            $arr[] = $key.'='.$val;
        }
        $result = $this->arr['url'].'?'.implode( '&', $arr );
        $result .= $location;
        return $result;
    }
}


class Safe{
    static function removeXSS($val){
        // remove all non-printable characters. CR(0a) and LF(0b) and TAB(9) are allowed
        // this prevents some character re-spacing such as <java\0script>
        // note that you have to handle splits with \n, \r, and \t later since they *are* allowed in some inputs
        $val = preg_replace('/([\x00-\x08,\x0b-\x0c,\x0e-\x19])/', '', $val);

        // straight replacements, the user should never need these since they're normal characters
        // this prevents like <IMG SRC=@avascript:alert('XSS')>
        $search = 'abcdefghijklmnopqrstuvwxyz';
        $search .= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $search .= '1234567890!@#$%^&*()';
        $search .= '~`";:?+/={}[]-_|\'\\';
        for ($i = 0; $i < strlen($search); $i++) {
            // ;? matches the ;, which is optional
            // 0{0,7} matches any padded zeros, which are optional and go up to 8 chars

            // @ @ search for the hex values
            $val = preg_replace('/(&#[xX]0{0,8}'.dechex(ord($search[$i])).';?)/i', $search[$i], $val); // with a ;
            // @ @ 0{0,7} matches '0' zero to seven times
            $val = preg_replace('/(&#0{0,8}'.ord($search[$i]).';?)/', $search[$i], $val); // with a ;
        }

        // now the only remaining whitespace attacks are \t, \n, and \r
        $ra1 = Array('javascript', 'vbscript', 'expression', 'applet', 'meta', 'xml', 'blink', 'link', 'style', 'script', 'embed', 'object', 'iframe', 'frame', 'frameset', 'ilayer', 'layer', 'bgsound', 'title', 'base');
        $ra2 = Array('onabort', 'onactivate', 'onafterprint', 'onafterupdate', 'onbeforeactivate', 'onbeforecopy', 'onbeforecut', 'onbeforedeactivate', 'onbeforeeditfocus', 'onbeforepaste', 'onbeforeprint', 'onbeforeunload', 'onbeforeupdate', 'onblur', 'onbounce', 'oncellchange', 'onchange', 'onclick', 'oncontextmenu', 'oncontrolselect', 'oncopy', 'oncut', 'ondataavailable', 'ondatasetchanged', 'ondatasetcomplete', 'ondblclick', 'ondeactivate', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'onerror', 'onerrorupdate', 'onfilterchange', 'onfinish', 'onfocus', 'onfocusin', 'onfocusout', 'onhelp', 'onkeydown', 'onkeypress', 'onkeyup', 'onlayoutcomplete', 'onload', 'onlosecapture', 'onmousedown', 'onmouseenter', 'onmouseleave', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onmove', 'onmoveend', 'onmovestart', 'onpaste', 'onpropertychange', 'onreadystatechange', 'onreset', 'onresize', 'onresizeend', 'onresizestart', 'onrowenter', 'onrowexit', 'onrowsdelete', 'onrowsinserted', 'onscroll', 'onselect', 'onselectionchange', 'onselectstart', 'onstart', 'onstop', 'onsubmit', 'onunload');
        $ra = array_merge($ra1, $ra2);

        $found = true; // keep replacing as long as the previous round replaced something
        while ($found == true) {
            $val_before = $val;
            for ($i = 0; $i < sizeof($ra); $i++) {
                $pattern = '/';
                for ($j = 0; $j < strlen($ra[$i]); $j++) {
                    if ($j > 0) {
                        $pattern .= '(';
                        $pattern .= '(&#[xX]0{0,8}([9ab]);)';
                        $pattern .= '|';
                        $pattern .= '|(&#0{0,8}([9|10|13]);)';
                        $pattern .= ')*';
                    }
                    $pattern .= $ra[$i][$j];
                }
                $pattern .= '/i';
                $replacement = substr($ra[$i], 0, 2).'<x>'.substr($ra[$i], 2); // add in <> to nerf the tag
                $val = preg_replace($pattern, $replacement, $val); // filter out the hex tags
                if ($val_before == $val) {
                    // no replacements were made, so exit the loop
                    $found = false;
                }
            }
        }
        return $val;
    }
}
?>