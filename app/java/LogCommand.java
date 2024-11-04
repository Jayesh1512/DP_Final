public class LogCommand implements GitCommand {
    private RepositoryManager repo;

    public LogCommand(RepositoryManager repo) {
        this.repo = repo;
    }

    @Override
    public void execute() {
        repo.showCommitLog();
    }
}
