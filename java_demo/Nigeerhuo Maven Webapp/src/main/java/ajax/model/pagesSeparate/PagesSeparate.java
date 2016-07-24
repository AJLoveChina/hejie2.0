package ajax.model.pagesSeparate;

import java.util.List;

import ajax.model.UniqueString;
import ajax.model.entity.Entity;

public interface PagesSeparate<T extends Entity<T>> {
	public UniqueString getPagesTypeKey();
	public UniqueString getMaxPageKey();
	public List<T> getNextPageList();
}
