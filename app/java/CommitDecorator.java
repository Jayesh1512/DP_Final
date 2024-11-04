public abstract class CommitDecorator extends Commit {
    protected Commit commit;

    public CommitDecorator(Commit commit) {
        super(commit.toString(), "");
        this.commit = commit;
    }

    @Override
    public abstract String toString();
}
