package com.aliyun.openservice.ons.http.demo;

import java.nio.charset.Charset;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import org.eclipse.jetty.client.HttpClient;
import org.eclipse.jetty.client.api.ContentProvider;
import org.eclipse.jetty.client.api.ContentResponse;
import org.eclipse.jetty.client.api.Request;
import org.eclipse.jetty.client.util.StringContentProvider;
import org.eclipse.jetty.http.HttpMethod;

import com.alibaba.fastjson.JSON;
import com.aliyun.openservices.ons.api.impl.authority.AuthUtil;

public class HttpConsumer {
    public static String SIGNATURE="Signature";
    public static String NUM="num";
    public static String CONSUMERID="ConsumerId";
    public static String PRODUCERID="ProducerId";

    public static String TIMEOUT="timeout"; 
    public static String TOPIC="topic";
    public static String AK="AccessKey";
    public static String BODY="body";  
    public static String MSGHANDLE="msgHandle";
    public static String TIME="time";
    public static void main(String[] args) throws Exception { 

        HttpClient httpClient=new HttpClient();   
        httpClient.setMaxConnectionsPerDestination(1);
        httpClient.start();  
        Properties properties=new Properties();
        properties.load(HttpConsumer.class.getClassLoader().getResourceAsStream("user.properties"));
        String topic=properties.getProperty("topic"); //请在user.properties配置您的topic
        String url=properties.getProperty("url");//公测集群配置为http://publictest-rest.ons.aliyun.com/
        //ONS的HTTP正式环境近期会上线，敬请期待
        String ak=properties.getProperty("user_accesskey");//请在user.properties配置您的accesskey
        String sk=properties.getProperty("user_secretkey");//请在user.properties配置您的secretkey
        String cid=properties.getProperty("consumer_group");//请在user.properties配置您的consumerId
        String date=String.valueOf(new Date().getTime());  
        String sign=null;
        String NEWLINE="\n";
        String signString;


        System.out.println(NEWLINE+NEWLINE); 
        while (true) {  
            try {
                date=String.valueOf(new Date().getTime());
                Request req=httpClient.POST(url+"message/?topic="+topic+"&time="+date+"&num="+32);
                req.method(HttpMethod.GET); 
                ContentResponse response; 
                signString=topic+NEWLINE+cid+NEWLINE+date;
                sign=AuthUtil.calSignature(signString.getBytes(Charset.forName("UTF-8")), sk);
                req.header(SIGNATURE, sign);
                req.header(AK, ak);
                req.header(CONSUMERID, cid);
                long start=System.currentTimeMillis();
                response=req.send();
                System.out.println("get cost:"+(System.currentTimeMillis()-start)/1000  
                                   +"    "+response.getStatus()+"    "+response.getContentAsString());  
                List<SimpleMessage> list = null; 

                if (response.getContentAsString()!=null&&!response.getContentAsString().isEmpty()) {
                     list=JSON.parseArray(response.getContentAsString(), SimpleMessage.class);
                }
                if (list==null||list.size()==0) { 
                    Thread.sleep(100);
                    continue;
                }   
                System.out.println("size is :"+list.size());
                for (SimpleMessage simpleMessage : list) {
                    date=String.valueOf(new Date().getTime());
                    System.out.println("receive msg:"+simpleMessage.getBody()+"   born time "+simpleMessage.getBornTime());
                    req=httpClient.POST(url+"message/?msgHandle="+simpleMessage.getMsgHandle()+"&topic="+topic+"&time="+date);
                    req.method(HttpMethod.DELETE);
                    signString=topic+NEWLINE+cid+NEWLINE+simpleMessage.getMsgHandle()+NEWLINE+date;
                    sign=AuthUtil.calSignature(signString.getBytes(Charset.forName("UTF-8")), sk);
                    req.header(SIGNATURE, sign);
                    req.header(AK, ak);
                    req.header(CONSUMERID, cid);
                    response=req.send();    
                    System.out.println("delete msg:"+response.toString());
                }
                Thread.sleep(100);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }

    }
}