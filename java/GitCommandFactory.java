public class GitCommandFactory {
    private RepositoryManager repo;

    public GitCommandFactory(RepositoryManager repo) {
        this.repo = repo;
    }

    public GitCommand createCommand(String type, String... args) {
        switch (type) {
            case "commit":
                return new CommitCommand(repo, args[0], args[1]);
            case "log":
                return new LogCommand(repo);
            case "checkout":
                return new CheckoutCommand(repo, args[0]);
            default:
                throw new IllegalArgumentException("Unknown command type: " + type);
        }
    }
}
