package group.flashy;

import java.util.ArrayList;
import java.util.Collection;

public class Set {
    private static int nextSetID = 1; //static value for nextSetID
    private int setID;
    private String setName;
    private int size;
    private String theme;
    private int userID;
    private Collection<Card> listOfCards;

    public Set(String setName, String theme, int userID) {
        this.setID = nextSetID ++;
        this.setName = setName;
        this.size = 0;
        this.theme = theme;
        this.userID = userID;
        this.listOfCards = new ArrayList<>();
    }


    //Getters

    public static int getNextSetID() {
        return nextSetID;
    }

    public int getSetID() {
        return setID;
    }

    public String getSetName() {
        return setName;
    }

    public int getSize() {
        return size;
    }

    public String getTheme() {
        return theme;
    }

    public int getUserID() {
        return userID;
    }

    
    //Methods

    public void addCard(Card card) {
        listOfCards.add(card);
        size++;
    }

    public boolean removeCard(Card card) {
        if (listOfCards.contains(card)) {
            listOfCards.remove(card);
            size--;
            return true; 
        }
        return false; 
    }

    public boolean containsCard(Card card) {
        return listOfCards.contains(card);
    }

    public void setTheme(String string) {
        this.theme = string;
    }
    
}


