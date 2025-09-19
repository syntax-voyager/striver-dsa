#include <iostream>

using namespace std;

int main()
{
    int n = 36;

    int ans = 0;

    //Brute Force

    // for (int i = 0; i <= n; i++)
    // {
    //     if ((i * i) <= n)
    //     {
    //         ans = i;
    //     }
    // }

    // Optimal

    int start = 0, end = n;

    while (start <= end){
        int mid = start + (end - start) / 2;

        if((mid * mid) <= n){
            start = mid + 1;
            ans = mid;
        }else{
            end = mid - 1;
        }
    }
    cout << ans << endl;
    return 0;
}