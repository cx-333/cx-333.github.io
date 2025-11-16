import os, datetime

folder = [i for i in os.listdir("./") if i not in ["to_github.py"]]
for fl in folder:
    print(fl)
    os.system(f"git add {fl}")
os.system(f"git commit -m {datetime.date.today()}_modify")
os.system("git pull git@github.com:cx-333/cx-333.github.io.git")
# os.system("git rm ./to_gitee.py")
os.system("git push -u origin main")
