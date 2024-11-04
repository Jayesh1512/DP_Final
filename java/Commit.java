public class Commit {
    private String message;
    private String data;

    public Commit(String message, String data) {
        this.message = message;
        this.data = data;
    }

    @Override
    public String toString() {
        return "Commit{" + "message='" + message + '\'' + ", data='" + data + '\'' + '}';
    }
}
