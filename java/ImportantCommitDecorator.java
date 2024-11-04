public class ImportantCommitDecorator extends CommitDecorator {
    public ImportantCommitDecorator(Commit commit) {
        super(commit);
    }

    @Override
    public String toString() {
        return "[IMPORTANT] " + commit.toString();
    }
}
