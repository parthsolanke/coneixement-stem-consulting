from setuptools import setup, find_packages

setup(
    name='STEM-Pathfinder',
    version='0.1',
    packages=find_packages(where='src'),
    package_dir={'': 'src'},
    install_requires=[
        'flask',
        'pandas',
        'numpy',
    ],
    entry_points={
        'console_scripts': [
            'stem-pathfinder=src.main:main',
        ],
    },
)