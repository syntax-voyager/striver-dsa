#include <iostream>
using namespace std;

void patternPrint(int n){
    for(int i = 1; i <= n; i++){
        //number
        for(int j = 1; j<= i; j++){
            cout << j;
        }
        //spaces
        for(int j = i; j < n; j++){
            cout << " ";
        }
        //second spaces
        for(int j = i; j < n; j++){
            cout << " ";
        }
        // number
        for(int j = i; j >= 1; j--){
            cout << j;
        }
        cout << endl;
    }
}

int main() {
    patternPrint(5);
    return 0;
}