public class CheckoutCommand implements GitCommand {
    private RepositoryManager repo;
    private String commitId;

    public CheckoutCommand(RepositoryManager repo, String commitId) {
        this.repo = repo;
        this.commitId = commitId;
    }

    @Override
    public void execute() {
        repo.checkout(commitId);
    }
}
