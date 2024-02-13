package group.flashy;

public class Card {
    private static int nextCardID = 1; //static value for nextCardID
    private int cardID;
    private String cardName;
    private String question;
    private String answer;
    private int userID;
    private Boolean isDifficult;

    public Card(int userID, String cardName, String question, String answer) {
        this.cardID = nextCardID++; //gives Card a unique id and increases nextCardID
        this.cardName = cardName;
        this.question = question;
        this.answer = answer;
        this.isDifficult = false;
        this.userID = userID;
    }

    public void changeDifficult() {
        if (getIsDifficult() == true){
            this.isDifficult = false;
        } 
        else {
            this.isDifficult = true;
        }
    }

    public void editAnswer(String s) {
        this.answer = s;
    }

    public void editQuestion(String s) {
        this.question = s;
    }

    public int getCardID() {
        return cardID;
    }

    public String getCardName() {
        return cardName;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public int getCardUserID() {
        return userID;
    }

    public Boolean getIsDifficult() {
        return isDifficult;
    }

    @Override
    public String toString() {
        return "Card [cardID=" + cardID + ", cardName=" + cardName + ", question=" + question + ", answer=" + answer
                + ", userID=" + userID + "]";
    }

    public static void main(String[] args) {
        
    }

}
