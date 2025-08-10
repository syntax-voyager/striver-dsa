#include <iostream>
#include <vector>

using namespace std;

void qs(vector<int>& a, int start, int end){
    
}

int main()
{
    vector<int> a = {4, 6, 2, 5, 7, 9, 1, 3};

    qs(a, 0, a.size() - 1);

    for (int i : a)
    {
        cout << i << " ";
    }
    cout << endl;
    return 0;
}