public class CommitCommand implements GitCommand {
    private RepositoryManager repo;
    private String message;
    private String data;

    public CommitCommand(RepositoryManager repo, String message, String data) {
        this.repo = repo;
        this.message = message;
        this.data = data;
    }

    @Override
    public void execute() {
        repo.createCommit(message, data);
    }
}
