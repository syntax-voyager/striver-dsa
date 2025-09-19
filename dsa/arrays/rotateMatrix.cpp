// LC 48

#include <iostream>
#include <vector>

using namespace std;

vector<vector<int>> bruteForce(vector<vector<int>> &matrix, int m, int n)
{
    vector<vector<int>> ans(m, vector<int>(n, 0));

    for (int i = 0; i < m; i++)
    {
        for (int j = 0; j < n; j++)
        {
            int temp = matrix[i][j];
            ans[j][n - 1 - i] = temp;
        }
    }
    return ans;
}

void optimal(vector<vector<int>> &matrix, int m, int n)
{
    for (int i = 0; i < m; i++)
    {
        for (int j = i; j < n; j++)
        {

            swap(matrix[i][j], matrix[j][i]);
        }
    }

    for (int i = 0; i < m; i++)
    {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}

int main()
{
    vector<vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int m = matrix.size();
    int n = matrix[0].size();

    // Before
    for (int i = 0; i < m; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
    cout << endl;

    // vector<vector<int>> ans = bruteForce(matrix, m, n);

    optimal(matrix, m, n);

    // After
    for (int i = 0; i < m; i++)
    {
        for (int j = 0; j < n; j++)
        {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}