// LC 54

#include <iostream>
#include <vector>

using namespace std;

vector<int> spiral(vector<vector<int>> &matrix, int m, int n)
{
    vector<int> ans;
    int top = 0, right = n - 1, bottom = m - 1, left = 0;

    while (top <= bottom && left <= right)
    {
        // top: left -> right
        for (int i = left; i <= right; i++)
        {
            ans.push_back(matrix[top][i]);
        }
        top++;

        // right: top -> bottom
        for (int i = top; i <= bottom; i++)
        {
            ans.push_back(matrix[i][right]);
        }
        right--;

        // bottom: right -> left
        if (top <= bottom)
        {

            for (int i = right; i >= left; i--)
            {
                ans.push_back(matrix[bottom][i]);
            }
            bottom--;
        }

        // left: bottom -> top
        if (left <= right)
        {

            for (int i = bottom; i >= top; i--)
            {
                ans.push_back(matrix[i][left]);
            }
            left++;
        }
    }
    return ans;
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

    vector<int> ans = spiral(matrix, m, n);

    // After
    for (int i = 0; i < ans.size(); i++)
    {
        cout << ans[i] << " ";
    }
    cout << endl;
    return 0;
}