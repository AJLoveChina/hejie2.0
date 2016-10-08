package ajax.model.entity;

import ajax.model.UniqueString;
import ajax.model.pagesSeparate.RealTimePaginationConfiguration;

public class Blog extends RealTimePaginationConfiguration<Blog>{

	private long id;
	
	
	@Override
	public int getPaginationPageSize() {
		return 10;
	}

	@Override
	public String getPrimaryKeyValue() {
		
	}

	@Override
	public String getPaginationPrimaryKey() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ajax.model.pagesSeparate.RealTimePaginationConfiguration.PK_TYPE getPaginationPrimaryKeyType() {
		// TODO Auto-generated method stub
		return null;
	}

}
