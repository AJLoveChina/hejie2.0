package ajax.jobs;

import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloJob implements Job{
	 private static Logger _log = LoggerFactory.getLogger(HelloJob.class);

	    /**
	     * <p>
	     * Empty constructor for job initilization
	     * </p>
	     * <p>
	     * Quartz requires a public empty constructor so that the
	     * scheduler can instantiate the class whenever it needs.
	     * </p>
	     */
	    public HelloJob() {
	    }

	    /**
	     * <p>
	     * Called by the <code>{@link org.quartz.Scheduler}</code> when a
	     * <code>{@link org.quartz.Trigger}</code> fires that is associated with
	     * the <code>Job</code>.
	     * </p>
	     * 
	     * @throws JobExecutionException
	     *             if there is an exception while executing the job.
	     */
	    public void execute(JobExecutionContext context)
	        throws JobExecutionException {

	        // Say Hello to the World and display the date/time
	        _log.info("Hello World! - " + new Date());
	    }
}
