public class TaggedCommitDecorator extends CommitDecorator {
    private String tag;

    public TaggedCommitDecorator(Commit commit, String tag) {
        super(commit);
        this.tag = tag;
    }

    @Override
    public String toString() {
        return commit.toString() + " [Tag: " + tag + "]";
    }
}
