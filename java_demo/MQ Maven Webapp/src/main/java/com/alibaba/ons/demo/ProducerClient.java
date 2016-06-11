package com.alibaba.ons.demo;

import java.io.IOException;
import java.util.Properties;

import com.aliyun.openservice.ons.http.demo.HttpConsumer;
import com.aliyun.openservices.ons.api.Message;
import com.aliyun.openservices.ons.api.ONSFactory;
import com.aliyun.openservices.ons.api.Producer;
import com.aliyun.openservices.ons.api.PropertyKeyConst;
import com.aliyun.openservices.ons.api.SendResult;

public class ProducerClient {

    public static void main(String[] args){
       
    	try {
			send("Hello I am aj");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
       
    }
    
    
    public static void send(String message) throws IOException {
    	Properties properties = new Properties();
        
        properties.load(HttpConsumer.class.getClassLoader().getResourceAsStream("user.properties"));
        
        
        String topic=properties.getProperty("topic"); //����user.properties��������topic
        String url=properties.getProperty("url");//���⼯Ⱥ����Ϊhttp://publictest-rest.ons.aliyun.com/
        //ONS��HTTP��ʽ�������ڻ����ߣ������ڴ�
        String ak=properties.getProperty("user_accesskey");//����user.properties��������accesskey
        String sk=properties.getProperty("user_secretkey");//����user.properties��������secretkey
        String cid=properties.getProperty("consumer_group");//����user.properties��������consumerId
        
        
        properties.put(PropertyKeyConst.ProducerId, topic);
        properties.put(PropertyKeyConst.AccessKey, ak);
        properties.put(PropertyKeyConst.SecretKey, sk);
        Producer producer = ONSFactory.createProducer(properties);
            
        //�ڷ�����Ϣǰ���������start����������Producer��ֻ�����һ�μ��ɡ�
        producer.start();
        Message msg = new Message(
             //Message Topic
             "nigeerhuo-topic", 
             //Message Tag,
             //�����ΪGmail�еı�ǩ������Ϣ�����ٹ��࣬����Consumerָ������������ONS����������        
             "TagA",
             //Message Body
             //�κζ�������ʽ�����ݣ�ONS�����κθ�Ԥ����ҪProducer��ConsumerЭ�̺�һ�µ����л��ͷ����л���ʽ
             message.getBytes()
         );
         
         // ���ô�����Ϣ��ҵ��ؼ����ԣ��뾡����ȫ��Ψһ��
         // �Է��������޷������յ���Ϣ����£���ͨ��ONS Console��ѯ��Ϣ��������
         // ע�⣺������Ҳ����Ӱ����Ϣ�����շ�
         msg.setKey("ORDERID_100");
         
         //������Ϣ��ֻҪ�����쳣���ǳɹ�
         SendResult sendResult = producer.send(msg);
         System.out.println(sendResult);

         // ��Ӧ���˳�ǰ������Producer����
         // ע�⣺���������Ҳû������
         producer.shutdown();
    }
}
