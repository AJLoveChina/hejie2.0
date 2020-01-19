package ajax.tools;

import java.io.InputStream;

import com.aliyun.oss.OSSClient;

public class OssUtil {
	
	public static final String accessKeyId = Tools.getConfig("aliyunAccessKey");
	public static final String accessKeySecret = Tools.getConfig("aliyunAccessSecret");
	
	
	public static OSSClient getOssClient() {
		String endpoint = "http://images.nigeerhuo.com";

		OSSClient client = new OSSClient(endpoint, accessKeyId, accessKeySecret);

		return client;
	}
	
	public static void close(OSSClient client) {
		client.shutdown();
	}

	public static void uploadToNigeerhuo(String key, InputStream inputStream) {
		OSSClient client = OssUtil.getOssClient();
		
		
		client.putObject("nigeerhuo-public", key, inputStream);
		
		
		OssUtil.close(client);
	}
}
