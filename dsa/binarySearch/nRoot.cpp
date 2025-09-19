#include <iostream>
using namespace std;
struct HashTable{
    vector<int> table;
    int m;
    HashTable(int size): m(size){
        table.assign(m,-1);
    }
    void insert(int key){
        int idx = key % m;
        int start = idx;
        while(table[idx]!=-1){
            idx = (idx + 1) % m;
            if(idx==start){ cout<<"Table full\n"; return; }
        }
        table[idx] = key;
    }
    bool search(int key){
        int idx = key % m;
        int start = idx;
        while(table[idx]!=-1){
            if(table[idx]==key) return true;
            idx = (idx + 1) % m;
            if(idx==start) break;
        }
        return false;
    }
    void display(){
        for(int i=0;i<m;i++) cout<<i<<":"<<table[i]<<" ";
        cout<<"\n";
    }
};
int main(){
    HashTable h(7);
    h.insert(10);
    h.insert(20);
    h.insert(5);
    h.insert(15);
    cout<<"Hash table:\n";
    h.display();
    cout<<"Search 20: "<<(h.search(20)?"Found":"Not Found")<<"\n";
    return 0;
}
